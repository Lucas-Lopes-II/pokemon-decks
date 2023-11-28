import { Card } from './card.interface';

export interface Deck {
  id: string;
  cards: Card[];
  types: string[];
  name: string;
  trainers: number;
  pokemons: number;
}
