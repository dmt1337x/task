import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { PhotoQuery } from '../../../../application/ports/primary/query/photo.query';
import {
  GET_ALL_PHOTOS_QUERY_PORT,
  GetAllPhotosQueryPort,
} from '../../../../application/ports/primary/query/get-all-photos.query-port';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { NavbarComponent } from '@core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface Pagination {
  pageSize: number;
  pageIndex: number;
  previousPageIndex: number;
}

@Component({
  selector: 'lib-album',
  templateUrl: './album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
  ],
})
export class AlbumComponent implements OnInit, OnDestroy {
  public pageSizeOptions: number[] = [10, 25, 50];
  public length: number = 5000;

  readonly filterByPriceForm: FormGroup = new FormGroup({
    price: new FormControl(0),
  });

  private _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private _priceFilterSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private readonly _onDestroy$ = new Subject<void>();
  private _paginationSubject: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>({
      pageIndex: 0,
      previousPageIndex: 0,
      pageSize: 10,
    });

  readonly pagination$: Observable<Pagination> =
    this._paginationSubject.asObservable();

  readonly priceFilter$: Observable<number> = this._priceFilterSubject
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly photos$: Observable<PhotoQuery[]> = this.pagination$.pipe(
    switchMap((pagination: Pagination) =>
      this._getAllPhotosQueryPort.getAllPhotos(
        pagination.pageIndex,
        pagination.pageSize
      )
    ),
    combineLatestWith(this._searchSubject.asObservable()),
    map(([photos, search]: [PhotoQuery[], string]) => {
      const regexp: RegExp = new RegExp(search ?? '', 'i');
      return photos.filter(
        (photo: PhotoQuery) =>
          regexp.test(photo.title) || regexp.test(photo.author)
      );
    }),
    combineLatestWith(this.priceFilter$),
    map(([photos, price]: [PhotoQuery[], number]) =>
      photos.filter((photo: PhotoQuery) =>
        price ? photo.price < price : photo
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    @Inject(GET_ALL_PHOTOS_QUERY_PORT)
    private _getAllPhotosQueryPort: GetAllPhotosQueryPort
  ) {}

  ngOnInit(): void {
    this.filterByPriceForm
      .get('price')
      ?.valueChanges.pipe(
        map((price: number) => this._priceFilterSubject.next(price)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  searchValue(event: string): void {
    this._searchSubject.next(event);
  }

  handlePageEvent(e: PageEvent): void {
    this._paginationSubject.next({
      pageSize: e.pageSize,
      pageIndex: e.pageIndex,
      previousPageIndex: e.pageIndex - 1,
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
