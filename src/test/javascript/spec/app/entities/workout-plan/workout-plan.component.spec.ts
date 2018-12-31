/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutPlanComponent } from 'app/entities/workout-plan/workout-plan.component';
import { WorkoutPlanService } from 'app/entities/workout-plan/workout-plan.service';
import { WorkoutPlan } from 'app/shared/model/workout-plan.model';

describe('Component Tests', () => {
    describe('WorkoutPlan Management Component', () => {
        let comp: WorkoutPlanComponent;
        let fixture: ComponentFixture<WorkoutPlanComponent>;
        let service: WorkoutPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutPlanComponent],
                providers: []
            })
                .overrideTemplate(WorkoutPlanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkoutPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutPlanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WorkoutPlan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.workoutPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
