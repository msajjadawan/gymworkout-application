import { IDayPlan } from 'app/shared/model//day-plan.model';

export interface IWorkoutPlan {
    id?: number;
    planName?: string;
    dayCount?: number;
    dayPlans?: IDayPlan[];
}

export class WorkoutPlan implements IWorkoutPlan {
    constructor(public id?: number, public planName?: string, public dayCount?: number, public dayPlans?: IDayPlan[]) {}
}
