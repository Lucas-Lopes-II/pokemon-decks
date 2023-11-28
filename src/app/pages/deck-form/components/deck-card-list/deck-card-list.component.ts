import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Deck, PagedList } from 'src/app/shared/interfaces';
import { CardComponent } from './../../../card-list/components/card';
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
    name: '',
    trainers: 0,
    pokemons: 0,
  };
  @Output() public addCard = new EventEmitter();
  @Output() public saveDeck = new EventEmitter();

  public onAddCard(): void {
    this.addCard.emit();
  }

  public onSaveDeck(): void {
    this.saveDeck.emit();
  }
}
