import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GymWorkoutExerciseModule } from './exercise/exercise.module';

import { GymWorkoutWorkoutPlanModule } from './workout-plan/workout-plan.module';
import { GymWorkoutDayPlanModule } from './day-plan/day-plan.module';
import { GymWorkoutWorkoutModule } from './workout/workout.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GymWorkoutExerciseModule,

        GymWorkoutWorkoutPlanModule,
        GymWorkoutDayPlanModule,
        GymWorkoutWorkoutModule,

        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymWorkoutEntityModule {}
