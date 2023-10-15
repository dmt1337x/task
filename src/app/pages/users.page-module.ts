import { NgModule } from '@angular/core';
import { UsersPage } from './users.page';
import {
  InitDetailsResolver,
  PhotosServiceModule,
  UserAlbumsStateModule,
  UsersListComponent,
  UsersServiceModule,
} from '@user-albums';
import { RouterModule } from '@angular/router';
import { UserDetailsPage } from './user-details.page';
import { RoutesPath } from '../routes.enum';

const routes = [
  {
    path: RoutesPath.ROOT,
    component: UsersPage,
  },
  {
    path: RoutesPath.USER_DETAILS,
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
