import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserQuery } from '../../../../application/ports/primary/query/user.query';
import {
  GET_USER_DETAILS_QUERY_PORT,
  GetUserDetailsQueryPort,
} from '../../../../application/ports/primary/query/get-user-details.query-port';
import { NavbarComponent } from '@core';
import { EditDetailsDirective } from '../../directives/edit-details.directive';

@Component({
  selector: 'lib-user-details',
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, EditDetailsDirective],
})
export class UserDetailsComponent {
  readonly userDetails$: Observable<UserQuery> =
    this._getUserDetailsQueryPort.getUserDetails();

  constructor(
    @Inject(GET_USER_DETAILS_QUERY_PORT)
    private _getUserDetailsQueryPort: GetUserDetailsQueryPort
  ) {}
}
