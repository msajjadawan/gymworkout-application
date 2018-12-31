package com.mobilminds.gym.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilminds.gym.domain.Workout;
import com.mobilminds.gym.repository.WorkoutRepository;
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
 * REST controller for managing Workout.
 */
@RestController
@RequestMapping("/api")
public class WorkoutResource {

    private final Logger log = LoggerFactory.getLogger(WorkoutResource.class);

    private static final String ENTITY_NAME = "workout";

    private final WorkoutRepository workoutRepository;

    public WorkoutResource(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    /**
     * POST  /workouts : Create a new workout.
     *
     * @param workout the workout to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workout, or with status 400 (Bad Request) if the workout has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/workouts")
    @Timed
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) throws URISyntaxException {
        log.debug("REST request to save Workout : {}", workout);
        if (workout.getId() != null) {
            throw new BadRequestAlertException("A new workout cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Workout result = workoutRepository.save(workout);
        return ResponseEntity.created(new URI("/api/workouts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /workouts : Updates an existing workout.
     *
     * @param workout the workout to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workout,
     * or with status 400 (Bad Request) if the workout is not valid,
     * or with status 500 (Internal Server Error) if the workout couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/workouts")
    @Timed
    public ResponseEntity<Workout> updateWorkout(@RequestBody Workout workout) throws URISyntaxException {
        log.debug("REST request to update Workout : {}", workout);
        if (workout.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Workout result = workoutRepository.save(workout);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workout.getId().toString()))
            .body(result);
    }

    /**
     * GET  /workouts : get all the workouts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workouts in body
     */
    @GetMapping("/workouts")
    @Timed
    public List<Workout> getAllWorkouts() {
        log.debug("REST request to get all Workouts");
        return workoutRepository.findAll();
    }

    /**
     * GET  /workouts/:id : get the "id" workout.
     *
     * @param id the id of the workout to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workout, or with status 404 (Not Found)
     */
    @GetMapping("/workouts/{id}")
    @Timed
    public ResponseEntity<Workout> getWorkout(@PathVariable Long id) {
        log.debug("REST request to get Workout : {}", id);
        Optional<Workout> workout = workoutRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(workout);
    }

    /**
     * DELETE  /workouts/:id : delete the "id" workout.
     *
     * @param id the id of the workout to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/workouts/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        log.debug("REST request to delete Workout : {}", id);

        workoutRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
