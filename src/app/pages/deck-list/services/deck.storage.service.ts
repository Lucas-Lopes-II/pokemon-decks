import { Injectable } from '@angular/core';

import { mockedDeck } from './moked-deck';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card, PagedList } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DeckStorageService {
  private readonly deckBS = new BehaviorSubject(mockedDeck);

  public getDeckBS(): Observable<PagedList<Card>> {
    return this.deckBS.asObservable();
  }

  public setDeckBS(deck: PagedList<Card>): void {
    this.deckBS.next(deck);
  }
}
