import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { CardService } from './services';
import { Card, PagedList } from 'src/app/shared/interfaces';
import { CardComponent } from './components/card';

@Component({
  selector: 'card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnDestroy, OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public cardList: PagedList<Card> = {
    data: [],
    page: 0,
    pageSize: 0,
    count: 0,
    totalCount: 0,
  };

  constructor(private readonly cardService: CardService) {}

  ngOnInit(): void {
    this.getDeckList();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  private getDeckList(): void {
    this.cardService
      .getCards(1)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: PagedList<Card>) => {
          this.cardList = response;
        },
      });
  }
}
