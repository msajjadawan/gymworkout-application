/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GymWorkoutTestModule } from '../../../test.module';
import { DayPlanComponent } from 'app/entities/day-plan/day-plan.component';
import { DayPlanService } from 'app/entities/day-plan/day-plan.service';
import { DayPlan } from 'app/shared/model/day-plan.model';

describe('Component Tests', () => {
    describe('DayPlan Management Component', () => {
        let comp: DayPlanComponent;
        let fixture: ComponentFixture<DayPlanComponent>;
        let service: DayPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [DayPlanComponent],
                providers: []
            })
                .overrideTemplate(DayPlanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DayPlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayPlanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DayPlan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dayPlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
