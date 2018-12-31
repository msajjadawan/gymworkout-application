import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymWorkoutSharedModule } from 'app/shared';
import {
    WorkoutPlanComponent,
    WorkoutPlanDetailComponent,
    WorkoutPlanUpdateComponent,
    WorkoutPlanDeletePopupComponent,
    WorkoutPlanDeleteDialogComponent,
    workoutPlanRoute,
    workoutPlanPopupRoute
} from './';

const ENTITY_STATES = [...workoutPlanRoute, ...workoutPlanPopupRoute];

@NgModule({
    imports: [GymWorkoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WorkoutPlanComponent,
        WorkoutPlanDetailComponent,
        WorkoutPlanUpdateComponent,
        WorkoutPlanDeleteDialogComponent,
        WorkoutPlanDeletePopupComponent
    ],
    entryComponents: [WorkoutPlanComponent, WorkoutPlanUpdateComponent, WorkoutPlanDeleteDialogComponent, WorkoutPlanDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymWorkoutWorkoutPlanModule {}
