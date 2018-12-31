/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutUpdateComponent } from 'app/entities/workout/workout-update.component';
import { WorkoutService } from 'app/entities/workout/workout.service';
import { Workout } from 'app/shared/model/workout.model';

describe('Component Tests', () => {
    describe('Workout Management Update Component', () => {
        let comp: WorkoutUpdateComponent;
        let fixture: ComponentFixture<WorkoutUpdateComponent>;
        let service: WorkoutService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutUpdateComponent]
            })
                .overrideTemplate(WorkoutUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkoutUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Workout(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.workout = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Workout();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.workout = entity;
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
