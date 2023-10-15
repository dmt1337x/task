import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  BehaviorSubject,
  combineLatestWith,
  Observable,
  shareReplay,
  Subject,
  takeUntil,
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PhotoQuery } from '../../../../application/ports/primary/query/photo.query';
import {
  GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT,
  GetPhotosForSpecificUserQueryPort,
} from '../../../../application/ports/primary/query/get-photos-for-specific-user.query-port';

@Component({
  selector: 'lib-photos-for-specific-user',
  templateUrl: './photos-for-specific-user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PhotosForSpecificUser implements OnInit, OnDestroy {
  readonly filterByPriceForm: FormGroup = new FormGroup({
    price: new FormControl(),
  });
  private readonly _onDestroy$ = new Subject<void>();
  private _priceFilterSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(50);

  readonly priceFilter$: Observable<number> =
    this._priceFilterSubject.asObservable();

  readonly photos$: Observable<PhotoQuery[]> = this._activatedRoute.params.pipe(
    switchMap((params: Params) =>
      this._getPhotosForSpecificUserQueryPort.getPhotosForSpecificUser(
        params['userId']
      )
    ),
    combineLatestWith(this.priceFilter$),
    map(([photos, price]: [PhotoQuery[], number]) =>
      photos.filter((photo: PhotoQuery) => photo.price < price)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    @Inject(GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT)
    private _getPhotosForSpecificUserQueryPort: GetPhotosForSpecificUserQueryPort,
    private _activatedRoute: ActivatedRoute
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

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
