/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutDetailComponent } from 'app/entities/workout/workout-detail.component';
import { Workout } from 'app/shared/model/workout.model';

describe('Component Tests', () => {
    describe('Workout Management Detail Component', () => {
        let comp: WorkoutDetailComponent;
        let fixture: ComponentFixture<WorkoutDetailComponent>;
        const route = ({ data: of({ workout: new Workout(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WorkoutDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkoutDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.workout).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
