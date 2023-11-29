import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { Deck, PagedList } from '../../shared/interfaces';
import { DeckStorageService } from '../../shared/services';
import { confirmMessage } from './../../shared/utils/confirm';
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

  public deleteDeck(deck: Deck): void {
    confirmMessage(
      `Deseja exlcuir o Bralho: ${deck.name}?`,
      () => {
        const newList = this.decks.filter((d) => d.id !== deck.id);
        this.decksStorage.setDeckBS(newList);
      },
      () => {
        return;
      },
    );
  }

  public registerDeck(): void {
    this.router.navigate(['deck-register']);
  }
}
