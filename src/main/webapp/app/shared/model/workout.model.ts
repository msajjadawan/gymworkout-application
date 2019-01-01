import { IDayPlan } from 'app/shared/model//day-plan.model';
import { IExercise } from 'app/shared/model//exercise.model';

export interface IWorkout {
    id?: number;
    repitations?: number;
    sets?: number;
    dayPlan?: IDayPlan;
    excise?: IExercise;
}

export class Workout implements IWorkout {
    constructor(
        public id?: number,
        public repitations?: number,
        public sets?: number,
        public dayPlan?: IDayPlan,
        public excise?: IExercise
    ) {}
}
