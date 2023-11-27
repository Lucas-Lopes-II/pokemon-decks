import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Card, PagedList, Deck } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DeckStorageService {
  private readonly deckBS = new BehaviorSubject<Deck[]>([]);
  private readonly deckToEditBS = new BehaviorSubject<Deck | null>(null);

  public getDeckBS(): Observable<Deck[]> {
    return this.deckBS.asObservable();
  }

  public setDeckBS(deck: Deck[]): void {
    this.deckBS.next(deck);
  }
  public getDeckToEditBS(): Observable<Deck | null> {
    return this.deckToEditBS.asObservable();
  }

  public setDeckToEditBS(deck: Deck | null): void {
    this.deckToEditBS.next(deck);
  }
}
