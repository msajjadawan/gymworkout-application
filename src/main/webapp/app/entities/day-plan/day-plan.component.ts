import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDayPlan } from 'app/shared/model/day-plan.model';
import { AccountService } from 'app/core';
import { DayPlanService } from './day-plan.service';

@Component({
    selector: 'jhi-day-plan',
    templateUrl: './day-plan.component.html'
})
export class DayPlanComponent implements OnInit, OnDestroy {
    dayPlans: IDayPlan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected dayPlanService: DayPlanService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.dayPlanService.query().subscribe(
            (res: HttpResponse<IDayPlan[]>) => {
                this.dayPlans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDayPlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDayPlan) {
        return item.id;
    }

    registerChangeInDayPlans() {
        this.eventSubscriber = this.eventManager.subscribe('dayPlanListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
