import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Card, PagedList } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getCards(page: number): Observable<PagedList<Card>> {
    let params = new HttpParams()
      .set('select', 'id,name,supertype,rules,set,number,images,types')
      .set('orderBy', 'name')
      .set('pageSize', '12')
      .set('page', String(page));

    return this.http.get<PagedList<Card>>(`${this.baseUrl}/cards`, { params });
  }
}
