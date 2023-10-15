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

@Component({
  selector: 'lib-album',
  templateUrl: './album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, RouterModule],
})
export class AlbumComponent implements OnInit, OnDestroy {
  readonly filterByPriceForm: FormGroup = new FormGroup({
    price: new FormControl(),
  });

  private _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private _priceFilterSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(50);
  private readonly _onDestroy$ = new Subject<void>();

  readonly priceFilter$: Observable<number> =
    this._priceFilterSubject.asObservable();

  readonly photos$: Observable<PhotoQuery[]> = this._getAllPhotosQueryPort
    .getAllPhotos()
    .pipe(
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
        photos.filter((photo: PhotoQuery) => photo.price < price)
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

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
