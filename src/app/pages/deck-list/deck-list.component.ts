import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { DeckStorageService } from './services';
import { Deck, PagedList } from '../../shared/interfaces';
import { EditIconComponent } from '../../shared/components/edit-icon';
import { DeleteIconComponent } from './../../shared/components/delete-icon';

@Component({
  selector: 'deck-list',
  standalone: true,
  imports: [CommonModule, EditIconComponent, DeleteIconComponent],
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnDestroy, OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public decks: Deck[] = [];

  constructor(
    private readonly decksStorage: DeckStorageService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.getDeckList();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  private getDeckList(): void {
    this.decksStorage
      .getDeckBS()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: Deck[]) => {
          this.decks = response;
        },
      });
  }

  public editDeck(deck: Deck): void {
    this.decksStorage.setDeckToEditBS(deck);
    this.router.navigate(['deck', deck.id]);
  }

  public deleteDeck(deckId: string): void {
    const newList = this.decks.filter((deck) => deck.id === deckId);
    this.decksStorage.setDeckBS(newList);
  }

  public registerDeck(): void {
    this.router.navigate(['deck-register']);
  }
}
