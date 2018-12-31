/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutPlanUpdateComponent } from 'app/entities/workout-plan/workout-plan-update.component';
import { WorkoutPlanService } from 'app/entities/workout-plan/workout-plan.service';
import { WorkoutPlan } from 'app/shared/model/workout-plan.model';

describe('Component Tests', () => {
    describe('WorkoutPlan Management Update Component', () => {
        let comp: WorkoutPlanUpdateComponent;
        let fixture: ComponentFixture<WorkoutPlanUpdateComponent>;
        let service: WorkoutPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutPlanUpdateComponent]
            })
                .overrideTemplate(WorkoutPlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkoutPlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutPlanService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new WorkoutPlan(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.workoutPlan = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new WorkoutPlan();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.workoutPlan = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
