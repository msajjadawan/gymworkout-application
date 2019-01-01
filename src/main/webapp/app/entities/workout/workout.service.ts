import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWorkout } from 'app/shared/model/workout.model';

type EntityResponseType = HttpResponse<IWorkout>;
type EntityArrayResponseType = HttpResponse<IWorkout[]>;

@Injectable({ providedIn: 'root' })
export class WorkoutService {
    public resourceUrl = SERVER_API_URL + 'api/workouts';

    constructor(protected http: HttpClient) {}

    create(workout: IWorkout): Observable<EntityResponseType> {
        return this.http.post<IWorkout>(this.resourceUrl, workout, { observe: 'response' });
    }

    update(workout: IWorkout): Observable<EntityResponseType> {
        return this.http.put<IWorkout>(this.resourceUrl, workout, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWorkout>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWorkout[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
