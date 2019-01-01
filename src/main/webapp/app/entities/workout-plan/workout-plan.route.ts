import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WorkoutPlan } from 'app/shared/model/workout-plan.model';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlanComponent } from './workout-plan.component';
import { WorkoutPlanDetailComponent } from './workout-plan-detail.component';
import { WorkoutPlanUpdateComponent } from './workout-plan-update.component';
import { WorkoutPlanDeletePopupComponent } from './workout-plan-delete-dialog.component';
import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';

@Injectable({ providedIn: 'root' })
export class WorkoutPlanResolve implements Resolve<IWorkoutPlan> {
    constructor(private service: WorkoutPlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkoutPlan> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<WorkoutPlan>) => response.ok),
                map((workoutPlan: HttpResponse<WorkoutPlan>) => workoutPlan.body)
            );
        }
        return of(new WorkoutPlan());
    }
}

export const workoutPlanRoute: Routes = [
    {
        path: 'workout-plan',
        component: WorkoutPlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkoutPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workout-plan/:id/view',
        component: WorkoutPlanDetailComponent,
        resolve: {
            workoutPlan: WorkoutPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkoutPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workout-plan/new',
        component: WorkoutPlanUpdateComponent,
        resolve: {
            workoutPlan: WorkoutPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkoutPlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'workout-plan/:id/edit',
        component: WorkoutPlanUpdateComponent,
        resolve: {
            workoutPlan: WorkoutPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkoutPlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workoutPlanPopupRoute: Routes = [
    {
        path: 'workout-plan/:id/delete',
        component: WorkoutPlanDeletePopupComponent,
        resolve: {
            workoutPlan: WorkoutPlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WorkoutPlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
