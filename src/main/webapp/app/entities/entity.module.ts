import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GymWorkoutExerciseModule } from './exercise/exercise.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GymWorkoutExerciseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GymWorkoutEntityModule {}
