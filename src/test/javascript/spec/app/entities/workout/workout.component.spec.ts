/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutComponent } from 'app/entities/workout/workout.component';
import { WorkoutService } from 'app/entities/workout/workout.service';
import { Workout } from 'app/shared/model/workout.model';

describe('Component Tests', () => {
    describe('Workout Management Component', () => {
        let comp: WorkoutComponent;
        let fixture: ComponentFixture<WorkoutComponent>;
        let service: WorkoutService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutComponent],
                providers: []
            })
                .overrideTemplate(WorkoutComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WorkoutComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Workout(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.workouts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
