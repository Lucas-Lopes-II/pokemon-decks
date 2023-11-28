import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { Deck } from './../../shared/interfaces';
import { CardListComponent } from '../card-list';
import { DeckStorageService } from '../../shared/services';
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
    name: '',
    trainers: 0,
    pokemons: 0,
  };
  public decks: Deck[] = [];
  public isAdding: boolean = false;

  constructor(
    private readonly decksStorage: DeckStorageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    if (this.id) {
      this.getDeckList();
    }
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
          this.getDeck();
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

  public onAddCard(): void {
    this.isAdding = true;
  }

  public onFinishAdd(): void {
    this.isAdding = false;
  }

  public onSaveDeck(): void {}
}
