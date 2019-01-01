import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWorkoutPlan } from 'app/shared/model/workout-plan.model';

type EntityResponseType = HttpResponse<IWorkoutPlan>;
type EntityArrayResponseType = HttpResponse<IWorkoutPlan[]>;

@Injectable({ providedIn: 'root' })
export class WorkoutPlanService {
    public resourceUrl = SERVER_API_URL + 'api/workout-plans';

    constructor(protected http: HttpClient) {}

    create(workoutPlan: IWorkoutPlan): Observable<EntityResponseType> {
        return this.http.post<IWorkoutPlan>(this.resourceUrl, workoutPlan, { observe: 'response' });
    }

    update(workoutPlan: IWorkoutPlan): Observable<EntityResponseType> {
        return this.http.put<IWorkoutPlan>(this.resourceUrl, workoutPlan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWorkoutPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWorkoutPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
