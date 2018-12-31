import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWorkout } from 'app/shared/model/workout.model';
import { AccountService } from 'app/core';
import { WorkoutService } from './workout.service';

@Component({
    selector: 'jhi-workout',
    templateUrl: './workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {
    workouts: IWorkout[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected workoutService: WorkoutService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.workoutService.query().subscribe(
            (res: HttpResponse<IWorkout[]>) => {
                this.workouts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkouts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWorkout) {
        return item.id;
    }

    registerChangeInWorkouts() {
        this.eventSubscriber = this.eventManager.subscribe('workoutListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
