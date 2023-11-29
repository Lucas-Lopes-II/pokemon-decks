import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Card } from './../../../../shared/interfaces';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() public cardData: Card | null = null;
  @Input() public isAdding: boolean = false;
  @Input() public isDeckCard: boolean = false;
  @Output() public addCard = new EventEmitter();
  @Output() public deleteCard = new EventEmitter();

  public onAddCard(): void {
    this.addCard.emit(this.cardData);
  }

  public onDeleteCard(): void {
    this.deleteCard.emit(this.cardData);
  }
}
