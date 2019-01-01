export interface IExercise {
    id?: number;
    title?: string;
    description?: string;
    videoLink?: string;
    iconLink?: string;
}

export class Exercise implements IExercise {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public videoLink?: string,
        public iconLink?: string
    ) {}
}
