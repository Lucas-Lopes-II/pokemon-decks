import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardComponent } from './../../../card-list/components/card';
import { Card, Deck, PagedList } from '../../../../shared/interfaces';
import { PaginatorComponent } from './../../../card-list/components/paginator';

@Component({
  selector: 'deck-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, PaginatorComponent],
  templateUrl: './deck-card-list.component.html',
  styleUrls: ['./deck-card-list.component.scss'],
})
export class DeckCardListComponent {
  @Input() public deckData: Deck = {
    id: '',
    cards: [],
    types: [],
    name: '',
    trainers: 0,
    pokemons: 0,
  };
  public isDeckCard: boolean = true;
  @Output() public openCardsToAdd = new EventEmitter();
  @Output() public saveDeck = new EventEmitter();
  @Output() public deleteCard = new EventEmitter<Card>();

  public onOpenCardsToAdd(): void {
    this.openCardsToAdd.emit();
  }

  public onSaveDeck(): void {
    this.saveDeck.emit();
  }

  public onDeleteCard(card: Card): void {
    this.deleteCard.emit(card);
  }
}
