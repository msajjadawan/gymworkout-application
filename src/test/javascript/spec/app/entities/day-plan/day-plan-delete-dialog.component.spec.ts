/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GymWorkoutTestModule } from '../../../test.module';
import { DayPlanDeleteDialogComponent } from 'app/entities/day-plan/day-plan-delete-dialog.component';
import { DayPlanService } from 'app/entities/day-plan/day-plan.service';

describe('Component Tests', () => {
    describe('DayPlan Management Delete Component', () => {
        let comp: DayPlanDeleteDialogComponent;
        let fixture: ComponentFixture<DayPlanDeleteDialogComponent>;
        let service: DayPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [DayPlanDeleteDialogComponent]
            })
                .overrideTemplate(DayPlanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DayPlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayPlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
