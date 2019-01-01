import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExercise } from 'app/shared/model/exercise.model';

type EntityResponseType = HttpResponse<IExercise>;
type EntityArrayResponseType = HttpResponse<IExercise[]>;

@Injectable({ providedIn: 'root' })
export class ExerciseService {
    public resourceUrl = SERVER_API_URL + 'api/exercises';

    constructor(protected http: HttpClient) {}

    create(exercise: IExercise): Observable<EntityResponseType> {
        return this.http.post<IExercise>(this.resourceUrl, exercise, { observe: 'response' });
    }

    update(exercise: IExercise): Observable<EntityResponseType> {
        return this.http.put<IExercise>(this.resourceUrl, exercise, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExercise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IExercise[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
