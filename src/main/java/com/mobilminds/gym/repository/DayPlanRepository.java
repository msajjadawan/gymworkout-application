package com.mobilminds.gym.repository;

import com.mobilminds.gym.domain.DayPlan;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DayPlan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayPlanRepository extends JpaRepository<DayPlan, Long> {

}
