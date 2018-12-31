import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';
import { AccountService } from 'app/core';
import { WorkoutPlanService } from './workout-plan.service';

@Component({
    selector: 'jhi-workout-plan',
    templateUrl: './workout-plan.component.html'
})
export class WorkoutPlanComponent implements OnInit, OnDestroy {
    workoutPlans: IWorkoutPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected workoutPlanService: WorkoutPlanService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.workoutPlanService.query().subscribe(
            (res: HttpResponse<IWorkoutPlan[]>) => {
                this.workoutPlans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWorkoutPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWorkoutPlan) {
        return item.id;
    }

    registerChangeInWorkoutPlans() {
        this.eventSubscriber = this.eventManager.subscribe('workoutPlanListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
