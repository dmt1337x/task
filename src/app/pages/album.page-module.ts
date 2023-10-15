import { NgModule } from '@angular/core';
import { AlbumPage } from './album.page';
import { RouterModule } from '@angular/router';
import {
  AlbumComponent,
  PhotosServiceModule,
  UserAlbumsStateModule,
  UsersServiceModule,
} from '@user-albums';

const routes = [
  {
    path: '',
    component: AlbumPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AlbumComponent,
    UsersServiceModule,
    UserAlbumsStateModule,
    PhotosServiceModule,
  ],
  declarations: [AlbumPage],
  exports: [AlbumPage],
})
export class AlbumPageModule {}
