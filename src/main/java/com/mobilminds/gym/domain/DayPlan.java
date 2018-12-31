package com.mobilminds.gym.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DayPlan.
 */
@Entity
@Table(name = "day_plan")
public class DayPlan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day_title")
    private String dayTitle;

    @ManyToOne
    @JsonIgnoreProperties("dayPlans")
    private WorkoutPlan workoutPlan;

    @OneToMany(mappedBy = "dayPlan")
    private Set<Workout> workouts = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDayTitle() {
        return dayTitle;
    }

    public DayPlan dayTitle(String dayTitle) {
        this.dayTitle = dayTitle;
        return this;
    }

    public void setDayTitle(String dayTitle) {
        this.dayTitle = dayTitle;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public DayPlan workoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
        return this;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public Set<Workout> getWorkouts() {
        return workouts;
    }

    public DayPlan workouts(Set<Workout> workouts) {
        this.workouts = workouts;
        return this;
    }

    public DayPlan addWorkouts(Workout workout) {
        this.workouts.add(workout);
        workout.setDayPlan(this);
        return this;
    }

    public DayPlan removeWorkouts(Workout workout) {
        this.workouts.remove(workout);
        workout.setDayPlan(null);
        return this;
    }

    public void setWorkouts(Set<Workout> workouts) {
        this.workouts = workouts;
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
        DayPlan dayPlan = (DayPlan) o;
        if (dayPlan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dayPlan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DayPlan{" +
            "id=" + getId() +
            ", dayTitle='" + getDayTitle() + "'" +
            "}";
    }
}
