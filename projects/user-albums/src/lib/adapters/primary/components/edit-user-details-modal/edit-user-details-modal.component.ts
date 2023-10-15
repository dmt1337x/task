import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserAlbumsStateModule } from '../../../../application/state/user-albums.state-module';
import { UsersServiceModule } from '../../../secondary/services/users/users.service-module';
import { PhotosServiceModule } from '../../../secondary/services/photos/photos.service-module';
import { UserQuery } from '../../../../application/ports/primary/query/user.query';
import {
  GET_USER_DETAILS_QUERY_PORT,
  GetUserDetailsQueryPort,
} from '../../../../application/ports/primary/query/get-user-details.query-port';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT,
  UpdateSpecificPropertyCommandPort,
} from '../../../../application/ports/primary/command/update-specific-property.command-port';
import { SpecificPropertyCommand } from '../../../../application/ports/primary/command/specific-property.command';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-edit-user-details-modal',
  templateUrl: './edit-user-details-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    UserAlbumsStateModule,
    UsersServiceModule,
    PhotosServiceModule,
    ReactiveFormsModule,
  ],
})
export class EditUserDetailsModalComponent implements OnInit, OnDestroy {
  title?: string;
  closeBtnName?: string;
  saveBtnName?: string;
  propertyName?: string | number;

  readonly editValueForm: FormGroup = new FormGroup({
    value: new FormControl('', [Validators.required]),
  });

  private readonly _onDestroy$ = new Subject<void>();
  private _valueSubject: BehaviorSubject<string | number> = new BehaviorSubject<
    string | number
  >('');

  constructor(
    public bsModalRef: BsModalRef,
    @Inject(GET_USER_DETAILS_QUERY_PORT)
    private _getUserDetailsQueryPort: GetUserDetailsQueryPort,
    @Inject(UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT)
    private _updateSpecificPropertyCommandPort: UpdateSpecificPropertyCommandPort
  ) {}

  ngOnInit(): void {
    this.prepopulateForm();
    this.saveNewValueInSubject();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  update(): void {
    this._valueSubject
      .asObservable()
      .pipe(
        take(1),
        switchMap((data: string | number) =>
          this._updateSpecificPropertyCommandPort.updateSpecificProperty(
            new SpecificPropertyCommand(
              this.propertyName as keyof UserQuery,
              data
            )
          )
        )
      )
      .subscribe(() => this.closeModal());
  }

  private prepopulateForm(): void {
    this._getUserDetailsQueryPort
      .getUserDetails()
      .pipe(
        take(1),
        map((user: UserQuery) => user[this.propertyName as keyof UserQuery]),
        tap((data: string | number) =>
          this.editValueForm.patchValue({ value: data })
        )
      )
      .subscribe();
  }

  private saveNewValueInSubject(): void {
    this.editValueForm
      .get('value')
      ?.valueChanges.pipe(
        tap((value: string | number) => this._valueSubject.next(value)),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }
}
