import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { Card, PagedList } from '../../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CardStorageService {
  private readonly listCardBS = new BehaviorSubject<PagedList<Card>>({
    data: [],
    page: 0,
    pageSize: 0,
    count: 0,
    totalCount: 0,
  });

  public getListCardBS(): Observable<PagedList<Card>> {
    return this.listCardBS.asObservable();
  }

  public setListCardBS(listCard: PagedList<Card>): void {
    this.listCardBS.next(listCard);
  }

  public resetListCardBS(): void {
    this.listCardBS.next({
      data: [],
      page: 1,
      pageSize: 0,
      count: 0,
      totalCount: 0,
    });
  }
}
