package com.mobilminds.gym.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mobilminds.gym.domain.DayPlan;
import com.mobilminds.gym.repository.DayPlanRepository;
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
 * REST controller for managing DayPlan.
 */
@RestController
@RequestMapping("/api")
public class DayPlanResource {

    private final Logger log = LoggerFactory.getLogger(DayPlanResource.class);

    private static final String ENTITY_NAME = "dayPlan";

    private final DayPlanRepository dayPlanRepository;

    public DayPlanResource(DayPlanRepository dayPlanRepository) {
        this.dayPlanRepository = dayPlanRepository;
    }

    /**
     * POST  /day-plans : Create a new dayPlan.
     *
     * @param dayPlan the dayPlan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dayPlan, or with status 400 (Bad Request) if the dayPlan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/day-plans")
    @Timed
    public ResponseEntity<DayPlan> createDayPlan(@RequestBody DayPlan dayPlan) throws URISyntaxException {
        log.debug("REST request to save DayPlan : {}", dayPlan);
        if (dayPlan.getId() != null) {
            throw new BadRequestAlertException("A new dayPlan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DayPlan result = dayPlanRepository.save(dayPlan);
        return ResponseEntity.created(new URI("/api/day-plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /day-plans : Updates an existing dayPlan.
     *
     * @param dayPlan the dayPlan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dayPlan,
     * or with status 400 (Bad Request) if the dayPlan is not valid,
     * or with status 500 (Internal Server Error) if the dayPlan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/day-plans")
    @Timed
    public ResponseEntity<DayPlan> updateDayPlan(@RequestBody DayPlan dayPlan) throws URISyntaxException {
        log.debug("REST request to update DayPlan : {}", dayPlan);
        if (dayPlan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DayPlan result = dayPlanRepository.save(dayPlan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dayPlan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /day-plans : get all the dayPlans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dayPlans in body
     */
    @GetMapping("/day-plans")
    @Timed
    public List<DayPlan> getAllDayPlans() {
        log.debug("REST request to get all DayPlans");
        return dayPlanRepository.findAll();
    }

    /**
     * GET  /day-plans/:id : get the "id" dayPlan.
     *
     * @param id the id of the dayPlan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dayPlan, or with status 404 (Not Found)
     */
    @GetMapping("/day-plans/{id}")
    @Timed
    public ResponseEntity<DayPlan> getDayPlan(@PathVariable Long id) {
        log.debug("REST request to get DayPlan : {}", id);
        Optional<DayPlan> dayPlan = dayPlanRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dayPlan);
    }

    /**
     * DELETE  /day-plans/:id : delete the "id" dayPlan.
     *
     * @param id the id of the dayPlan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/day-plans/{id}")
    @Timed
    public ResponseEntity<Void> deleteDayPlan(@PathVariable Long id) {
        log.debug("REST request to delete DayPlan : {}", id);

        dayPlanRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
