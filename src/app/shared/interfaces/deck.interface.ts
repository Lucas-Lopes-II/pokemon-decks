import { Card } from './card.interface';

export interface Deck {
  id: string;
  cards: Card[];
  name: string;
  trainers: number;
  pokemons: number;
}
