import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDayPlan } from 'app/shared/model/day-plan.model';
import { DayPlanService } from './day-plan.service';
import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';
import { WorkoutPlanService } from 'app/entities/workout-plan';

@Component({
    selector: 'jhi-day-plan-update',
    templateUrl: './day-plan-update.component.html'
})
export class DayPlanUpdateComponent implements OnInit {
    dayPlan: IDayPlan;
    isSaving: boolean;

    workoutplans: IWorkoutPlan[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected dayPlanService: DayPlanService,
        protected workoutPlanService: WorkoutPlanService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dayPlan }) => {
            this.dayPlan = dayPlan;
        });
        this.workoutPlanService.query().subscribe(
            (res: HttpResponse<IWorkoutPlan[]>) => {
                this.workoutplans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dayPlan.id !== undefined) {
            this.subscribeToSaveResponse(this.dayPlanService.update(this.dayPlan));
        } else {
            this.subscribeToSaveResponse(this.dayPlanService.create(this.dayPlan));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayPlan>>) {
        result.subscribe((res: HttpResponse<IDayPlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackWorkoutPlanById(index: number, item: IWorkoutPlan) {
        return item.id;
    }
}
