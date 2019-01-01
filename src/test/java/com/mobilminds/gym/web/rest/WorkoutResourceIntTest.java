package com.mobilminds.gym.web.rest;

import com.mobilminds.gym.GymWorkoutApp;

import com.mobilminds.gym.domain.Workout;
import com.mobilminds.gym.repository.WorkoutRepository;
import com.mobilminds.gym.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mobilminds.gym.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkoutResource REST controller.
 *
 * @see WorkoutResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GymWorkoutApp.class)
public class WorkoutResourceIntTest {

    private static final Integer DEFAULT_REPITATIONS = 1;
    private static final Integer UPDATED_REPITATIONS = 2;

    private static final Integer DEFAULT_SETS = 1;
    private static final Integer UPDATED_SETS = 2;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restWorkoutMockMvc;

    private Workout workout;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkoutResource workoutResource = new WorkoutResource(workoutRepository);
        this.restWorkoutMockMvc = MockMvcBuilders.standaloneSetup(workoutResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Workout createEntity(EntityManager em) {
        Workout workout = new Workout()
            .repitations(DEFAULT_REPITATIONS)
            .sets(DEFAULT_SETS);
        return workout;
    }

    @Before
    public void initTest() {
        workout = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkout() throws Exception {
        int databaseSizeBeforeCreate = workoutRepository.findAll().size();

        // Create the Workout
        restWorkoutMockMvc.perform(post("/api/workouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isCreated());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeCreate + 1);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepitations()).isEqualTo(DEFAULT_REPITATIONS);
        assertThat(testWorkout.getSets()).isEqualTo(DEFAULT_SETS);
    }

    @Test
    @Transactional
    public void createWorkoutWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workoutRepository.findAll().size();

        // Create the Workout with an existing ID
        workout.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkoutMockMvc.perform(post("/api/workouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkouts() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        // Get all the workoutList
        restWorkoutMockMvc.perform(get("/api/workouts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workout.getId().intValue())))
            .andExpect(jsonPath("$.[*].repitations").value(hasItem(DEFAULT_REPITATIONS)))
            .andExpect(jsonPath("$.[*].sets").value(hasItem(DEFAULT_SETS)));
    }
    
    @Test
    @Transactional
    public void getWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        // Get the workout
        restWorkoutMockMvc.perform(get("/api/workouts/{id}", workout.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workout.getId().intValue()))
            .andExpect(jsonPath("$.repitations").value(DEFAULT_REPITATIONS))
            .andExpect(jsonPath("$.sets").value(DEFAULT_SETS));
    }

    @Test
    @Transactional
    public void getNonExistingWorkout() throws Exception {
        // Get the workout
        restWorkoutMockMvc.perform(get("/api/workouts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();

        // Update the workout
        Workout updatedWorkout = workoutRepository.findById(workout.getId()).get();
        // Disconnect from session so that the updates on updatedWorkout are not directly saved in db
        em.detach(updatedWorkout);
        updatedWorkout
            .repitations(UPDATED_REPITATIONS)
            .sets(UPDATED_SETS);

        restWorkoutMockMvc.perform(put("/api/workouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkout)))
            .andExpect(status().isOk());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepitations()).isEqualTo(UPDATED_REPITATIONS);
        assertThat(testWorkout.getSets()).isEqualTo(UPDATED_SETS);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();

        // Create the Workout

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkoutMockMvc.perform(put("/api/workouts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeDelete = workoutRepository.findAll().size();

        // Get the workout
        restWorkoutMockMvc.perform(delete("/api/workouts/{id}", workout.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Workout.class);
        Workout workout1 = new Workout();
        workout1.setId(1L);
        Workout workout2 = new Workout();
        workout2.setId(workout1.getId());
        assertThat(workout1).isEqualTo(workout2);
        workout2.setId(2L);
        assertThat(workout1).isNotEqualTo(workout2);
        workout1.setId(null);
        assertThat(workout1).isNotEqualTo(workout2);
    }
}
