import { IWorkoutPlan } from 'app/shared/model//workout-plan.model';
import { IWorkout } from 'app/shared/model//workout.model';

export interface IDayPlan {
    id?: number;
    dayTitle?: string;
    workoutPlan?: IWorkoutPlan;
    workouts?: IWorkout[];
}

export class DayPlan implements IDayPlan {
    constructor(public id?: number, public dayTitle?: string, public workoutPlan?: IWorkoutPlan, public workouts?: IWorkout[]) {}
}
