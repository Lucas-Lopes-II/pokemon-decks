import { Component, Input } from '@angular/core';
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
}
