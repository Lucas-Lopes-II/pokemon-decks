import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { CardStorageService } from './services';
import { CardComponent } from './components/card';
import { CardService } from '../../shared/services';
import { Card, PagedList } from '../../shared/interfaces';
import { PaginatorComponent } from './components/paginator';
import { HttpErrorResponse } from '@angular/common/http';

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
  @Input() withCache: boolean = true;
  @Input() public isAdding: boolean = false;
  @Output() public finishAdd = new EventEmitter();
  @Output() public addCard = new EventEmitter();

  constructor(
    private readonly cardService: CardService,
    private readonly cardStorageService: CardStorageService,
  ) {}

  ngOnInit(): void {
    if (this.withCache) {
      this.getDeckList();
    } else {
      this.getDeckListFromApi();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
    if (this.withCache) {
      this.cardStorageService.setListCardBS(this.cardList);
    }
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
        error: (err: HttpErrorResponse) => {
          console.error(err);
          alert('Ocorreu um erro contate o administrador');
        },
      });
  }

  public onPrevius(): void {
    this.getDeckListFromApi(this.cardList.page - 1);
  }

  public onNext(): void {
    this.getDeckListFromApi(this.cardList.page + 1);
  }

  onFinishAdd(): void {
    this.finishAdd.emit();
  }

  public onAddCard(card: Card): void {
    this.addCard.emit(card);
  }
}
