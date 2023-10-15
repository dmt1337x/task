import { NgModule } from '@angular/core';
import { UsersPage } from './users.page';
import {
  EditUserDetailsModalComponent,
  InitDetailsResolver,
  PhotosServiceModule,
  UserAlbumsStateModule,
  UsersListComponent,
  UsersServiceModule,
} from '@user-albums';
import { RouterModule } from '@angular/router';
import { UserDetailsPage } from './user-details.page';

const routes = [
  {
    path: '',
    component: UsersPage,
  },
  {
    path: `:userId`,
    component: UserDetailsPage,
    resolve: { initDetails: InitDetailsResolver },
  },
];

@NgModule({
  imports: [
    UsersListComponent,
    UsersServiceModule,
    UserAlbumsStateModule,
    PhotosServiceModule,
    RouterModule.forChild(routes),
  ],
  declarations: [UsersPage],
  providers: [InitDetailsResolver],

  exports: [UsersPage],
})
export class UsersPageModule {}
