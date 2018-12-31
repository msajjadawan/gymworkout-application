package com.mobilminds.gym.repository;

import com.mobilminds.gym.domain.WorkoutPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the WorkoutPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {

}
