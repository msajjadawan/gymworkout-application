import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';

@Component({
    selector: 'jhi-workout-plan-detail',
    templateUrl: './workout-plan-detail.component.html'
})
export class WorkoutPlanDetailComponent implements OnInit {
    workoutPlan: IWorkoutPlan;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workoutPlan }) => {
            this.workoutPlan = workoutPlan;
        });
    }

    previousState() {
        window.history.back();
    }
}
