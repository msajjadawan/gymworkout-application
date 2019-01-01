import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkout } from 'app/shared/model/workout.model';

@Component({
    selector: 'jhi-workout-detail',
    templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {
    workout: IWorkout;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workout }) => {
            this.workout = workout;
        });
    }

    previousState() {
        window.history.back();
    }
}
