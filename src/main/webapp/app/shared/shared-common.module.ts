import { NgModule } from '@angular/core';

import { GymWorkoutSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [GymWorkoutSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [GymWorkoutSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class GymWorkoutSharedCommonModule {}
