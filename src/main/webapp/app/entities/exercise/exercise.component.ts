import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExercise } from 'app/shared/model/exercise.model';
import { AccountService } from 'app/core';
import { ExerciseService } from './exercise.service';

@Component({
    selector: 'jhi-exercise',
    templateUrl: './exercise.component.html'
})
export class ExerciseComponent implements OnInit, OnDestroy {
    exercises: IExercise[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected exerciseService: ExerciseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.exerciseService.query().subscribe(
            (res: HttpResponse<IExercise[]>) => {
                this.exercises = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInExercises();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IExercise) {
        return item.id;
    }

    registerChangeInExercises() {
        this.eventSubscriber = this.eventManager.subscribe('exerciseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
