/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GymWorkoutTestModule } from '../../../test.module';
import { DayPlanUpdateComponent } from 'app/entities/day-plan/day-plan-update.component';
import { DayPlanService } from 'app/entities/day-plan/day-plan.service';
import { DayPlan } from 'app/shared/model/day-plan.model';

describe('Component Tests', () => {
    describe('DayPlan Management Update Component', () => {
        let comp: DayPlanUpdateComponent;
        let fixture: ComponentFixture<DayPlanUpdateComponent>;
        let service: DayPlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [DayPlanUpdateComponent]
            })
                .overrideTemplate(DayPlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DayPlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayPlanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DayPlan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dayPlan = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DayPlan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dayPlan = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
