package com.mobilminds.gym.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Workout.
 */
@Entity
@Table(name = "workout")
public class Workout implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "repitations")
    private Integer repitations;

    @Column(name = "sets")
    private Integer sets;

    @ManyToOne
    @JsonIgnoreProperties("workouts")
    private DayPlan dayPlan;

    @OneToOne    @JoinColumn(unique = true)
    private Exercise excise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRepitations() {
        return repitations;
    }

    public Workout repitations(Integer repitations) {
        this.repitations = repitations;
        return this;
    }

    public void setRepitations(Integer repitations) {
        this.repitations = repitations;
    }

    public Integer getSets() {
        return sets;
    }

    public Workout sets(Integer sets) {
        this.sets = sets;
        return this;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public DayPlan getDayPlan() {
        return dayPlan;
    }

    public Workout dayPlan(DayPlan dayPlan) {
        this.dayPlan = dayPlan;
        return this;
    }

    public void setDayPlan(DayPlan dayPlan) {
        this.dayPlan = dayPlan;
    }

    public Exercise getExcise() {
        return excise;
    }

    public Workout excise(Exercise exercise) {
        this.excise = exercise;
        return this;
    }

    public void setExcise(Exercise exercise) {
        this.excise = exercise;
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
        Workout workout = (Workout) o;
        if (workout.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), workout.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Workout{" +
            "id=" + getId() +
            ", repitations=" + getRepitations() +
            ", sets=" + getSets() +
            "}";
    }
}
