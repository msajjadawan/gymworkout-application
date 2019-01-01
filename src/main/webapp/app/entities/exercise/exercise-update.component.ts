import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
    selector: 'jhi-exercise-update',
    templateUrl: './exercise-update.component.html'
})
export class ExerciseUpdateComponent implements OnInit {
    exercise: IExercise;
    isSaving: boolean;

    constructor(protected exerciseService: ExerciseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ exercise }) => {
            this.exercise = exercise;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.exercise.id !== undefined) {
            this.subscribeToSaveResponse(this.exerciseService.update(this.exercise));
        } else {
            this.subscribeToSaveResponse(this.exerciseService.create(this.exercise));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExercise>>) {
        result.subscribe((res: HttpResponse<IExercise>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
