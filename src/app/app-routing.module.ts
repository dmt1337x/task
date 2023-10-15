import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageModule } from './pages/users.page-module';
import { RoutesPath } from './routes.enum';
import { AlbumPageModule } from './pages/album.page-module';

const routes: Routes = [
  {
    path: RoutesPath.ROOT,
    redirectTo: RoutesPath.USERS,
    pathMatch: 'full',
  },
  {
    path: RoutesPath.USERS,
    loadChildren: () => UsersPageModule,
  },
  {
    path: RoutesPath.ALBUM,
    loadChildren: () => AlbumPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
