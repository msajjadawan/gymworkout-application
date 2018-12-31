import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayPlan } from 'app/shared/model/day-plan.model';
import { DayPlanService } from './day-plan.service';
import { DayPlanComponent } from './day-plan.component';
import { DayPlanDetailComponent } from './day-plan-detail.component';
import { DayPlanUpdateComponent } from './day-plan-update.component';
import { DayPlanDeletePopupComponent } from './day-plan-delete-dialog.component';
import { IDayPlan } from 'app/shared/model/day-plan.model';

@Injectable({ providedIn: 'root' })
export class DayPlanResolve implements Resolve<IDayPlan> {
    constructor(private service: DayPlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DayPlan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DayPlan>) => response.ok),
                map((dayPlan: HttpResponse<DayPlan>) => dayPlan.body)
            );
        }
        return of(new DayPlan());
    }
}

export const dayPlanRoute: Routes = [
    {
        path: 'day-plan',
        component: DayPlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'day-plan/:id/view',
        component: DayPlanDetailComponent,
        resolve: {
            dayPlan: DayPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'day-plan/new',
        component: DayPlanUpdateComponent,
        resolve: {
            dayPlan: DayPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'day-plan/:id/edit',
        component: DayPlanUpdateComponent,
        resolve: {
            dayPlan: DayPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayPlanPopupRoute: Routes = [
    {
        path: 'day-plan/:id/delete',
        component: DayPlanDeletePopupComponent,
        resolve: {
            dayPlan: DayPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
