package com.mobilminds.gym.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilminds.gym.domain.WorkoutPlan;
import com.mobilminds.gym.repository.WorkoutPlanRepository;
import com.mobilminds.gym.web.rest.errors.BadRequestAlertException;
import com.mobilminds.gym.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing WorkoutPlan.
 */
@RestController
@RequestMapping("/api")
public class WorkoutPlanResource {

    private final Logger log = LoggerFactory.getLogger(WorkoutPlanResource.class);

    private static final String ENTITY_NAME = "workoutPlan";

    private final WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlanResource(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    /**
     * POST  /workout-plans : Create a new workoutPlan.
     *
     * @param workoutPlan the workoutPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workoutPlan, or with status 400 (Bad Request) if the workoutPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/workout-plans")
    @Timed
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) throws URISyntaxException {
        log.debug("REST request to save WorkoutPlan : {}", workoutPlan);
        if (workoutPlan.getId() != null) {
            throw new BadRequestAlertException("A new workoutPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WorkoutPlan result = workoutPlanRepository.save(workoutPlan);
        return ResponseEntity.created(new URI("/api/workout-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /workout-plans : Updates an existing workoutPlan.
     *
     * @param workoutPlan the workoutPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workoutPlan,
     * or with status 400 (Bad Request) if the workoutPlan is not valid,
     * or with status 500 (Internal Server Error) if the workoutPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/workout-plans")
    @Timed
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) throws URISyntaxException {
        log.debug("REST request to update WorkoutPlan : {}", workoutPlan);
        if (workoutPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WorkoutPlan result = workoutPlanRepository.save(workoutPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workoutPlan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /workout-plans : get all the workoutPlans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workoutPlans in body
     */
    @GetMapping("/workout-plans")
    @Timed
    public List<WorkoutPlan> getAllWorkoutPlans() {
        log.debug("REST request to get all WorkoutPlans");
        return workoutPlanRepository.findAll();
    }

    /**
     * GET  /workout-plans/:id : get the "id" workoutPlan.
     *
     * @param id the id of the workoutPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workoutPlan, or with status 404 (Not Found)
     */
    @GetMapping("/workout-plans/{id}")
    @Timed
    public ResponseEntity<WorkoutPlan> getWorkoutPlan(@PathVariable Long id) {
        log.debug("REST request to get WorkoutPlan : {}", id);
        Optional<WorkoutPlan> workoutPlan = workoutPlanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workoutPlan);
    }

    /**
     * DELETE  /workout-plans/:id : delete the "id" workoutPlan.
     *
     * @param id the id of the workoutPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/workout-plans/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Long id) {
        log.debug("REST request to delete WorkoutPlan : {}", id);

        workoutPlanRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
