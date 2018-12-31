/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GymWorkoutTestModule } from '../../../test.module';
import { WorkoutDeleteDialogComponent } from 'app/entities/workout/workout-delete-dialog.component';
import { WorkoutService } from 'app/entities/workout/workout.service';

describe('Component Tests', () => {
    describe('Workout Management Delete Component', () => {
        let comp: WorkoutDeleteDialogComponent;
        let fixture: ComponentFixture<WorkoutDeleteDialogComponent>;
        let service: WorkoutService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GymWorkoutTestModule],
                declarations: [WorkoutDeleteDialogComponent]
            })
                .overrideTemplate(WorkoutDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WorkoutDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WorkoutService);
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
