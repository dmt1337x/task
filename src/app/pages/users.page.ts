import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './users.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage {}
