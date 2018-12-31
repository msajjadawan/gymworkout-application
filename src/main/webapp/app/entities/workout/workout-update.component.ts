import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWorkout } from 'app/shared/model/workout.model';
import { WorkoutService } from './workout.service';
import { IDayPlan } from 'app/shared/model/day-plan.model';
import { DayPlanService } from 'app/entities/day-plan';
import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from 'app/entities/exercise';

@Component({
    selector: 'jhi-workout-update',
    templateUrl: './workout-update.component.html'
})
export class WorkoutUpdateComponent implements OnInit {
    workout: IWorkout;
    isSaving: boolean;

    dayplans: IDayPlan[];

    excises: IExercise[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected workoutService: WorkoutService,
        protected dayPlanService: DayPlanService,
        protected exerciseService: ExerciseService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ workout }) => {
            this.workout = workout;
        });
        this.dayPlanService.query().subscribe(
            (res: HttpResponse<IDayPlan[]>) => {
                this.dayplans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.exerciseService.query({ filter: 'workout-is-null' }).subscribe(
            (res: HttpResponse<IExercise[]>) => {
                if (!this.workout.excise || !this.workout.excise.id) {
                    this.excises = res.body;
                } else {
                    this.exerciseService.find(this.workout.excise.id).subscribe(
                        (subRes: HttpResponse<IExercise>) => {
                            this.excises = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.workout.id !== undefined) {
            this.subscribeToSaveResponse(this.workoutService.update(this.workout));
        } else {
            this.subscribeToSaveResponse(this.workoutService.create(this.workout));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkout>>) {
        result.subscribe((res: HttpResponse<IWorkout>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDayPlanById(index: number, item: IDayPlan) {
        return item.id;
    }

    trackExerciseById(index: number, item: IExercise) {
        return item.id;
    }
}
