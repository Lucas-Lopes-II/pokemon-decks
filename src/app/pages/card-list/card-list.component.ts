import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { CardService, CardStorageService } from './services';
import { CardComponent } from './components/card';
import { Card, PagedList } from 'src/app/shared/interfaces';
import { PaginatorComponent } from './components/paginator';

@Component({
  selector: 'card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, PaginatorComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnDestroy, OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public cardList: PagedList<Card> = {
    data: [],
    page: 1,
    pageSize: 0,
    count: 0,
    totalCount: 0,
  };

  constructor(
    private readonly cardService: CardService,
    private readonly cardStorageService: CardStorageService,
  ) {}

  ngOnInit(): void {
    this.getDeckList();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
    this.cardStorageService.setListCardBS(this.cardList);
  }

  private getDeckList(): void {
    this.cardStorageService
      .getListCardBS()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: PagedList<Card>) => {
          if (response.data.length > 0) {
            this.cardList = response;
          } else {
            this.getDeckListFromApi();
          }
        },
      });
  }

  private getDeckListFromApi(page: number = 1): void {
    this.cardService
      .getCards(page)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (response: PagedList<Card>) => {
          this.cardList = response;
        },
      });
  }

  public onPrevius(): void {
    this.getDeckListFromApi(this.cardList.page - 1);
  }

  public onNext(): void {
    this.getDeckListFromApi(this.cardList.page + 1);
  }
}
