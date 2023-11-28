import { Injectable } from '@angular/core';

import { Card, Deck } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  public validateAddCardOnDeck(card: Card, deck: Deck): Deck {
    if (this.isAddRulesInflicted(card, deck)) {
      return deck;
    }

    const newTypes = card.types
      ? [...new Set([...deck.types, ...card.types!])]
      : deck.types;
    const newPokemonsCount =
      card.supertype === 'Pokémon' ? deck.pokemons + 1 : deck.pokemons;
    const newTrainersCount =
      card.supertype === 'Trainer' ? deck.trainers + 1 : deck.trainers;

    const newDeck: Deck = {
      ...deck,
      types: newTypes,
      cards: [...deck.cards, card],
      pokemons: newPokemonsCount,
      trainers: newTrainersCount,
    };

    return newDeck;
  }

  private isAddRulesInflicted(card: Card, deck: Deck): boolean {
    if (deck.cards.length === 60) {
      alert('Limite de 60 cartas atingido! Por favor, crie outro baralho.');

      return true;
    }

    let countSameName = 0;
    let alreadyAdded = false;

    deck.cards.forEach((c) => {
      if (c.name === card.name) {
        countSameName++;
      }

      if (c.id === card.id) {
        alreadyAdded = true;
      }
    });

    if (countSameName === 4) {
      alert(
        'Só podem haver 4 cartas com o mesmo nome! Por favor, selecione outra carta.',
      );

      return true;
    }

    if (alreadyAdded) {
      alert(
        'Não é possível cadastrar a mesma carta duas vezes! Por favor, selecione outra carta.',
      );

      return true;
    }

    return false;
  }
}
