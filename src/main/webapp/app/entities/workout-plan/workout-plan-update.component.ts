import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';
import { WorkoutPlanService } from './workout-plan.service';

@Component({
    selector: 'jhi-workout-plan-update',
    templateUrl: './workout-plan-update.component.html'
})
export class WorkoutPlanUpdateComponent implements OnInit {
    workoutPlan: IWorkoutPlan;
    isSaving: boolean;

    constructor(protected workoutPlanService: WorkoutPlanService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ workoutPlan }) => {
            this.workoutPlan = workoutPlan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.workoutPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.workoutPlanService.update(this.workoutPlan));
        } else {
            this.subscribeToSaveResponse(this.workoutPlanService.create(this.workoutPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkoutPlan>>) {
        result.subscribe((res: HttpResponse<IWorkoutPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
