import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDayPlan } from 'app/shared/model/day-plan.model';

type EntityResponseType = HttpResponse<IDayPlan>;
type EntityArrayResponseType = HttpResponse<IDayPlan[]>;

@Injectable({ providedIn: 'root' })
export class DayPlanService {
    public resourceUrl = SERVER_API_URL + 'api/day-plans';

    constructor(protected http: HttpClient) {}

    create(dayPlan: IDayPlan): Observable<EntityResponseType> {
        return this.http.post<IDayPlan>(this.resourceUrl, dayPlan, { observe: 'response' });
    }

    update(dayPlan: IDayPlan): Observable<EntityResponseType> {
        return this.http.put<IDayPlan>(this.resourceUrl, dayPlan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDayPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDayPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
