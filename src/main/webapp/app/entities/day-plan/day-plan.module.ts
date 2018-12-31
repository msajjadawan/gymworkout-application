import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GymWorkoutSharedModule } from 'app/shared';
import {
    DayPlanComponent,
    DayPlanDetailComponent,
    DayPlanUpdateComponent,
    DayPlanDeletePopupComponent,
    DayPlanDeleteDialogComponent,
    dayPlanRoute,
    dayPlanPopupRoute
} from './';

const ENTITY_STATES = [...dayPlanRoute, ...dayPlanPopupRoute];

@NgModule({
    imports: [GymWorkoutSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DayPlanComponent,
        DayPlanDetailComponent,
        DayPlanUpdateComponent,
        DayPlanDeleteDialogComponent,
        DayPlanDeletePopupComponent
    ],
    entryComponents: [DayPlanComponent, DayPlanUpdateComponent, DayPlanDeleteDialogComponent, DayPlanDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymWorkoutDayPlanModule {}
