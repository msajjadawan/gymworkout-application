/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutPlanDetailComponent } from 'app/entities/workout-plan/workout-plan-detail.component';
import { WorkoutPlan } from 'app/shared/model/workout-plan.model';

describe('Component Tests', () => {
    describe('WorkoutPlan Management Detail Component', () => {
        let comp: WorkoutPlanDetailComponent;
        let fixture: ComponentFixture<WorkoutPlanDetailComponent>;
        const route = ({ data: of({ workoutPlan: new WorkoutPlan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutPlanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WorkoutPlanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkoutPlanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.workoutPlan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
