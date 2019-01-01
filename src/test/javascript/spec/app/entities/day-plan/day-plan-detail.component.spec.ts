/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { DayPlanDetailComponent } from 'app/entities/day-plan/day-plan-detail.component';
import { DayPlan } from 'app/shared/model/day-plan.model';

describe('Component Tests', () => {
    describe('DayPlan Management Detail Component', () => {
        let comp: DayPlanDetailComponent;
        let fixture: ComponentFixture<DayPlanDetailComponent>;
        const route = ({ data: of({ dayPlan: new DayPlan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [DayPlanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DayPlanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DayPlanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dayPlan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
