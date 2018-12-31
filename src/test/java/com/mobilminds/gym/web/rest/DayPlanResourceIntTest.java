package com.mobilminds.gym.web.rest;

import com.mobilminds.gym.GymWorkoutApp;

import com.mobilminds.gym.domain.DayPlan;
import com.mobilminds.gym.repository.DayPlanRepository;
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
 * Test class for the DayPlanResource REST controller.
 *
 * @see DayPlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GymWorkoutApp.class)
public class DayPlanResourceIntTest {

    private static final String DEFAULT_DAY_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_DAY_TITLE = "BBBBBBBBBB";

    @Autowired
    private DayPlanRepository dayPlanRepository;

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

    private MockMvc restDayPlanMockMvc;

    private DayPlan dayPlan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DayPlanResource dayPlanResource = new DayPlanResource(dayPlanRepository);
        this.restDayPlanMockMvc = MockMvcBuilders.standaloneSetup(dayPlanResource)
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
    public static DayPlan createEntity(EntityManager em) {
        DayPlan dayPlan = new DayPlan()
            .dayTitle(DEFAULT_DAY_TITLE);
        return dayPlan;
    }

    @Before
    public void initTest() {
        dayPlan = createEntity(em);
    }

    @Test
    @Transactional
    public void createDayPlan() throws Exception {
        int databaseSizeBeforeCreate = dayPlanRepository.findAll().size();

        // Create the DayPlan
        restDayPlanMockMvc.perform(post("/api/day-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayPlan)))
            .andExpect(status().isCreated());

        // Validate the DayPlan in the database
        List<DayPlan> dayPlanList = dayPlanRepository.findAll();
        assertThat(dayPlanList).hasSize(databaseSizeBeforeCreate + 1);
        DayPlan testDayPlan = dayPlanList.get(dayPlanList.size() - 1);
        assertThat(testDayPlan.getDayTitle()).isEqualTo(DEFAULT_DAY_TITLE);
    }

    @Test
    @Transactional
    public void createDayPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dayPlanRepository.findAll().size();

        // Create the DayPlan with an existing ID
        dayPlan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayPlanMockMvc.perform(post("/api/day-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayPlan)))
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        List<DayPlan> dayPlanList = dayPlanRepository.findAll();
        assertThat(dayPlanList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDayPlans() throws Exception {
        // Initialize the database
        dayPlanRepository.saveAndFlush(dayPlan);

        // Get all the dayPlanList
        restDayPlanMockMvc.perform(get("/api/day-plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayPlan.getId().intValue())))
            .andExpect(jsonPath("$.[*].dayTitle").value(hasItem(DEFAULT_DAY_TITLE.toString())));
    }
    
    @Test
    @Transactional
    public void getDayPlan() throws Exception {
        // Initialize the database
        dayPlanRepository.saveAndFlush(dayPlan);

        // Get the dayPlan
        restDayPlanMockMvc.perform(get("/api/day-plans/{id}", dayPlan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dayPlan.getId().intValue()))
            .andExpect(jsonPath("$.dayTitle").value(DEFAULT_DAY_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDayPlan() throws Exception {
        // Get the dayPlan
        restDayPlanMockMvc.perform(get("/api/day-plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDayPlan() throws Exception {
        // Initialize the database
        dayPlanRepository.saveAndFlush(dayPlan);

        int databaseSizeBeforeUpdate = dayPlanRepository.findAll().size();

        // Update the dayPlan
        DayPlan updatedDayPlan = dayPlanRepository.findById(dayPlan.getId()).get();
        // Disconnect from session so that the updates on updatedDayPlan are not directly saved in db
        em.detach(updatedDayPlan);
        updatedDayPlan
            .dayTitle(UPDATED_DAY_TITLE);

        restDayPlanMockMvc.perform(put("/api/day-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDayPlan)))
            .andExpect(status().isOk());

        // Validate the DayPlan in the database
        List<DayPlan> dayPlanList = dayPlanRepository.findAll();
        assertThat(dayPlanList).hasSize(databaseSizeBeforeUpdate);
        DayPlan testDayPlan = dayPlanList.get(dayPlanList.size() - 1);
        assertThat(testDayPlan.getDayTitle()).isEqualTo(UPDATED_DAY_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingDayPlan() throws Exception {
        int databaseSizeBeforeUpdate = dayPlanRepository.findAll().size();

        // Create the DayPlan

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayPlanMockMvc.perform(put("/api/day-plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayPlan)))
            .andExpect(status().isBadRequest());

        // Validate the DayPlan in the database
        List<DayPlan> dayPlanList = dayPlanRepository.findAll();
        assertThat(dayPlanList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDayPlan() throws Exception {
        // Initialize the database
        dayPlanRepository.saveAndFlush(dayPlan);

        int databaseSizeBeforeDelete = dayPlanRepository.findAll().size();

        // Get the dayPlan
        restDayPlanMockMvc.perform(delete("/api/day-plans/{id}", dayPlan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DayPlan> dayPlanList = dayPlanRepository.findAll();
        assertThat(dayPlanList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayPlan.class);
        DayPlan dayPlan1 = new DayPlan();
        dayPlan1.setId(1L);
        DayPlan dayPlan2 = new DayPlan();
        dayPlan2.setId(dayPlan1.getId());
        assertThat(dayPlan1).isEqualTo(dayPlan2);
        dayPlan2.setId(2L);
        assertThat(dayPlan1).isNotEqualTo(dayPlan2);
        dayPlan1.setId(null);
        assertThat(dayPlan1).isNotEqualTo(dayPlan2);
    }
}
