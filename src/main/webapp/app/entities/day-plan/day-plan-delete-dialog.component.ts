import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDayPlan } from 'app/shared/model/day-plan.model';
import { DayPlanService } from './day-plan.service';

@Component({
    selector: 'jhi-day-plan-delete-dialog',
    templateUrl: './day-plan-delete-dialog.component.html'
})
export class DayPlanDeleteDialogComponent {
    dayPlan: IDayPlan;

    constructor(protected dayPlanService: DayPlanService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayPlanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayPlanListModification',
                content: 'Deleted an dayPlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-day-plan-delete-popup',
    template: ''
})
export class DayPlanDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dayPlan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DayPlanDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dayPlan = dayPlan;
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
