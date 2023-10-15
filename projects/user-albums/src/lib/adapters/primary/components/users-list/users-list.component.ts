import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { UserQuery } from '../../../../application/ports/primary/query/user.query';
import {
  GET_ALL_USERS_QUERY_PORT,
  GetAllUsersQueryPort,
} from '../../../../application/ports/primary/query/get-all-users.query-port';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NavbarComponent } from '@core';
import { PhotoQuery } from '../../../../application/ports/primary/query/photo.query';

@Component({
  selector: 'lib-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: './users-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
})
export class UsersListComponent {
  private _searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private _sortByNameAscSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  readonly sortByNameAsc$: Observable<boolean> = this._sortByNameAscSubject
    .asObservable()
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly users$: Observable<UserQuery[]> = this._getAllUsersQueryPort
    .getAllUsers()
    .pipe(
      combineLatestWith(this._searchSubject.asObservable()),
      map(([users, search]: [UserQuery[], string]) => {
        const regexp: RegExp = new RegExp(search ?? '', 'i');
        return users.filter(
          (user: UserQuery) =>
            regexp.test(user.name) || regexp.test(user.username)
        );
      }),
      switchMap((users: UserQuery[]) => this.sortByName(users)),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  constructor(
    @Inject(GET_ALL_USERS_QUERY_PORT)
    private _getAllUsersQueryPort: GetAllUsersQueryPort
  ) {}

  searchValue(event: string): void {
    this._searchSubject.next(event);
  }

  changeSort(): void {
    this._sortByNameAscSubject.next(!this._sortByNameAscSubject.value);
  }

  private sortByName(users: UserQuery[]): Observable<UserQuery[]> {
    return this.sortByNameAsc$.pipe(
      map((shouldSortAsc: boolean) => {
        if (shouldSortAsc) {
          return users.sort((a, b) => a.name.localeCompare(b.name));
        }
        return users.sort((a, b) => b.name.localeCompare(a.name));
      })
    );
  }
}
