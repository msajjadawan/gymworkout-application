import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';
import { WorkoutPlanService } from './workout-plan.service';

@Component({
    selector: 'jhi-workout-plan-delete-dialog',
    templateUrl: './workout-plan-delete-dialog.component.html'
})
export class WorkoutPlanDeleteDialogComponent {
    workoutPlan: IWorkoutPlan;

    constructor(
        protected workoutPlanService: WorkoutPlanService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workoutPlanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'workoutPlanListModification',
                content: 'Deleted an workoutPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-workout-plan-delete-popup',
    template: ''
})
export class WorkoutPlanDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workoutPlan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WorkoutPlanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.workoutPlan = workoutPlan;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
