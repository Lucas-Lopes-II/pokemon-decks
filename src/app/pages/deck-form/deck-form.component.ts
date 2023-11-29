import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { Card, Deck } from './../../shared/interfaces';
import { CardListComponent } from '../card-list';
import { DeckService, DeckStorageService } from '../../shared/services';
import { confirmMessage } from './../../shared/utils/confirm';
import { DeckCardListComponent } from './components/deck-card-list';

@Component({
  selector: 'deck-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeckCardListComponent,
    CardListComponent,
  ],
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss'],
})
export class DeckFormComponent implements OnDestroy, OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public id: string = '';
  public nameField = new FormControl('', Validators.required);
  public deckData: Deck = {
    id: '',
    cards: [],
    types: [],
    name: '',
    trainers: 0,
    pokemons: 0,
  };
  public decks: Deck[] = [];
  public isAdding: boolean = false;

  constructor(
    private readonly decksStorage: DeckStorageService,
    private readonly decksService: DeckService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getDeckList();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
    this.decksStorage.setDeckBS(this.decks);
  }

  private getDeckList(): void {
    this.decksStorage
      .getDeckBS()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: Deck[]) => {
          this.decks = response;

          if (this.id) {
            this.getDeck();
          }
        },
      });
  }

  private getDeck(): void {
    this.decksStorage
      .getDeckToEditBS()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: Deck | null) => {
          if (response) {
            this.deckData = response;
            this.nameField.patchValue(this.deckData?.name || '');
          } else {
            this.getDeckFromList(this.id);
          }
        },
      });
  }

  private getDeckFromList(id: string): void {
    const deck = this.decks.find((d) => d.id === id);

    if (deck) {
      this.deckData = deck;
      this.nameField.patchValue(this.deckData?.name || '');
    } else {
      confirmMessage(
        'Não foi encontrado baralho com esse ID. Gostaria de cadastar um novo?',
        () => {
          this.router.navigate(['deck-register']);
        },
        () => {
          this.router.navigate(['deck-list']);
        },
      );
    }
  }

  public onOpenCardsToAdd(): void {
    this.isAdding = true;
  }

  public onFinishAdd(): void {
    this.isAdding = false;
  }

  public onAddCard(card: Card): void {
    this.deckData = this.decksService.validateAddCardOnDeck(
      card,
      this.deckData,
    );
  }

  public onSaveDeck(): void {
    if (this.deckData.cards.length < 24) {
      alert('Mínimo de cartas deve ser 24! Por favor, adicione mais cartas.');

      return;
    }

    if (this.nameField.invalid) {
      alert('O baralho precisa de um nome');

      return;
    }

    if (this.id) {
      this.decks = this.editedDecks(this.decks);
    } else {
      this.decks = this.addNewDeckInList(this.decks);
    }

    this.router.navigate(['deck-list']);
  }

  private editedDecks(decks: Deck[]): Deck[] {
    const newDecks = decks.map((deck) => {
      if (this.id === deck.id) {
        return {
          ...deck,
          ...this.deckData,
          name: this.nameField.value || '',
        };
      }

      return deck;
    });

    return newDecks;
  }

  private addNewDeckInList(decks: Deck[]): Deck[] {
    const newDeck: Deck = {
      ...this.deckData,
      id: String(Date.now()),
      name: this.nameField.value || '',
    };
    const newDecks = [...decks, newDeck];

    return newDecks;
  }
}
