package com.mobilminds.gym.web.rest;

import com.mobilminds.gym.GymWorkoutApp;

import com.mobilminds.gym.domain.WorkoutPlan;
import com.mobilminds.gym.repository.WorkoutPlanRepository;
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
 * Test class for the WorkoutPlanResource REST controller.
 *
 * @see WorkoutPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GymWorkoutApp.class)
public class WorkoutPlanResourceIntTest {

    private static final String DEFAULT_PLAN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_DAY_COUNT = 1;
    private static final Integer UPDATED_DAY_COUNT = 2;

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

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

    private MockMvc restWorkoutPlanMockMvc;

    private WorkoutPlan workoutPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkoutPlanResource workoutPlanResource = new WorkoutPlanResource(workoutPlanRepository);
        this.restWorkoutPlanMockMvc = MockMvcBuilders.standaloneSetup(workoutPlanResource)
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
    public static WorkoutPlan createEntity(EntityManager em) {
        WorkoutPlan workoutPlan = new WorkoutPlan()
            .planName(DEFAULT_PLAN_NAME)
            .dayCount(DEFAULT_DAY_COUNT);
        return workoutPlan;
    }

    @Before
    public void initTest() {
        workoutPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkoutPlan() throws Exception {
        int databaseSizeBeforeCreate = workoutPlanRepository.findAll().size();

        // Create the WorkoutPlan
        restWorkoutPlanMockMvc.perform(post("/api/workout-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workoutPlan)))
            .andExpect(status().isCreated());

        // Validate the WorkoutPlan in the database
        List<WorkoutPlan> workoutPlanList = workoutPlanRepository.findAll();
        assertThat(workoutPlanList).hasSize(databaseSizeBeforeCreate + 1);
        WorkoutPlan testWorkoutPlan = workoutPlanList.get(workoutPlanList.size() - 1);
        assertThat(testWorkoutPlan.getPlanName()).isEqualTo(DEFAULT_PLAN_NAME);
        assertThat(testWorkoutPlan.getDayCount()).isEqualTo(DEFAULT_DAY_COUNT);
    }

    @Test
    @Transactional
    public void createWorkoutPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workoutPlanRepository.findAll().size();

        // Create the WorkoutPlan with an existing ID
        workoutPlan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkoutPlanMockMvc.perform(post("/api/workout-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workoutPlan)))
            .andExpect(status().isBadRequest());

        // Validate the WorkoutPlan in the database
        List<WorkoutPlan> workoutPlanList = workoutPlanRepository.findAll();
        assertThat(workoutPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkoutPlans() throws Exception {
        // Initialize the database
        workoutPlanRepository.saveAndFlush(workoutPlan);

        // Get all the workoutPlanList
        restWorkoutPlanMockMvc.perform(get("/api/workout-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workoutPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].planName").value(hasItem(DEFAULT_PLAN_NAME.toString())))
            .andExpect(jsonPath("$.[*].dayCount").value(hasItem(DEFAULT_DAY_COUNT)));
    }
    
    @Test
    @Transactional
    public void getWorkoutPlan() throws Exception {
        // Initialize the database
        workoutPlanRepository.saveAndFlush(workoutPlan);

        // Get the workoutPlan
        restWorkoutPlanMockMvc.perform(get("/api/workout-plans/{id}", workoutPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workoutPlan.getId().intValue()))
            .andExpect(jsonPath("$.planName").value(DEFAULT_PLAN_NAME.toString()))
            .andExpect(jsonPath("$.dayCount").value(DEFAULT_DAY_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingWorkoutPlan() throws Exception {
        // Get the workoutPlan
        restWorkoutPlanMockMvc.perform(get("/api/workout-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkoutPlan() throws Exception {
        // Initialize the database
        workoutPlanRepository.saveAndFlush(workoutPlan);

        int databaseSizeBeforeUpdate = workoutPlanRepository.findAll().size();

        // Update the workoutPlan
        WorkoutPlan updatedWorkoutPlan = workoutPlanRepository.findById(workoutPlan.getId()).get();
        // Disconnect from session so that the updates on updatedWorkoutPlan are not directly saved in db
        em.detach(updatedWorkoutPlan);
        updatedWorkoutPlan
            .planName(UPDATED_PLAN_NAME)
            .dayCount(UPDATED_DAY_COUNT);

        restWorkoutPlanMockMvc.perform(put("/api/workout-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkoutPlan)))
            .andExpect(status().isOk());

        // Validate the WorkoutPlan in the database
        List<WorkoutPlan> workoutPlanList = workoutPlanRepository.findAll();
        assertThat(workoutPlanList).hasSize(databaseSizeBeforeUpdate);
        WorkoutPlan testWorkoutPlan = workoutPlanList.get(workoutPlanList.size() - 1);
        assertThat(testWorkoutPlan.getPlanName()).isEqualTo(UPDATED_PLAN_NAME);
        assertThat(testWorkoutPlan.getDayCount()).isEqualTo(UPDATED_DAY_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkoutPlan() throws Exception {
        int databaseSizeBeforeUpdate = workoutPlanRepository.findAll().size();

        // Create the WorkoutPlan

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkoutPlanMockMvc.perform(put("/api/workout-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workoutPlan)))
            .andExpect(status().isBadRequest());

        // Validate the WorkoutPlan in the database
        List<WorkoutPlan> workoutPlanList = workoutPlanRepository.findAll();
        assertThat(workoutPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWorkoutPlan() throws Exception {
        // Initialize the database
        workoutPlanRepository.saveAndFlush(workoutPlan);

        int databaseSizeBeforeDelete = workoutPlanRepository.findAll().size();

        // Get the workoutPlan
        restWorkoutPlanMockMvc.perform(delete("/api/workout-plans/{id}", workoutPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WorkoutPlan> workoutPlanList = workoutPlanRepository.findAll();
        assertThat(workoutPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WorkoutPlan.class);
        WorkoutPlan workoutPlan1 = new WorkoutPlan();
        workoutPlan1.setId(1L);
        WorkoutPlan workoutPlan2 = new WorkoutPlan();
        workoutPlan2.setId(workoutPlan1.getId());
        assertThat(workoutPlan1).isEqualTo(workoutPlan2);
        workoutPlan2.setId(2L);
        assertThat(workoutPlan1).isNotEqualTo(workoutPlan2);
        workoutPlan1.setId(null);
        assertThat(workoutPlan1).isNotEqualTo(workoutPlan2);
    }
}
