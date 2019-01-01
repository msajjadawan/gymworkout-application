package com.mobilminds.gym.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A WorkoutPlan.
 */
@Entity
@Table(name = "workout_plan")
public class WorkoutPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "day_count")
    private Integer dayCount;

    @OneToMany(mappedBy = "workoutPlan")
    private Set<DayPlan> dayPlans = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public WorkoutPlan planName(String planName) {
        this.planName = planName;
        return this;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Integer getDayCount() {
        return dayCount;
    }

    public WorkoutPlan dayCount(Integer dayCount) {
        this.dayCount = dayCount;
        return this;
    }

    public void setDayCount(Integer dayCount) {
        this.dayCount = dayCount;
    }

    public Set<DayPlan> getDayPlans() {
        return dayPlans;
    }

    public WorkoutPlan dayPlans(Set<DayPlan> dayPlans) {
        this.dayPlans = dayPlans;
        return this;
    }

    public WorkoutPlan addDayPlans(DayPlan dayPlan) {
        this.dayPlans.add(dayPlan);
        dayPlan.setWorkoutPlan(this);
        return this;
    }

    public WorkoutPlan removeDayPlans(DayPlan dayPlan) {
        this.dayPlans.remove(dayPlan);
        dayPlan.setWorkoutPlan(null);
        return this;
    }

    public void setDayPlans(Set<DayPlan> dayPlans) {
        this.dayPlans = dayPlans;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WorkoutPlan workoutPlan = (WorkoutPlan) o;
        if (workoutPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workoutPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WorkoutPlan{" +
            "id=" + getId() +
            ", planName='" + getPlanName() + "'" +
            ", dayCount=" + getDayCount() +
            "}";
    }
}
