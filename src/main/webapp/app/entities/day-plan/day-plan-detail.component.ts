import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDayPlan } from 'app/shared/model/day-plan.model';

@Component({
    selector: 'jhi-day-plan-detail',
    templateUrl: './day-plan-detail.component.html'
})
export class DayPlanDetailComponent implements OnInit {
    dayPlan: IDayPlan;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dayPlan }) => {
            this.dayPlan = dayPlan;
        });
    }

    previousState() {
        window.history.back();
    }
}
