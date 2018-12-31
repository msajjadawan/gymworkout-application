/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutPlanDeleteDialogComponent } from 'app/entities/workout-plan/workout-plan-delete-dialog.component';
import { WorkoutPlanService } from 'app/entities/workout-plan/workout-plan.service';

describe('Component Tests', () => {
    describe('WorkoutPlan Management Delete Component', () => {
        let comp: WorkoutPlanDeleteDialogComponent;
        let fixture: ComponentFixture<WorkoutPlanDeleteDialogComponent>;
        let service: WorkoutPlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutPlanDeleteDialogComponent]
            })
                .overrideTemplate(WorkoutPlanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkoutPlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutPlanService);
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
