import { NgModule } from '@angular/core';
import { UserAlbumsState } from './user-albums.state';
import { GET_ALL_USERS_QUERY_PORT } from '../ports/primary/query/get-all-users.query-port';
import { GET_USER_DETAILS_QUERY_PORT } from '../ports/primary/query/get-user-details.query-port';
import { INIT_DETAILS_COMMAND_PORT } from '../ports/primary/command/init-details.command-port';
import { GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT } from '../ports/primary/query/get-photos-for-specific-user.query-port';
import { GET_ALL_PHOTOS_QUERY_PORT } from '../ports/primary/query/get-all-photos.query-port';
import { UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT } from '../ports/primary/command/update-specific-property.command-port';

@NgModule({
  providers: [
    UserAlbumsState,
    { provide: GET_ALL_USERS_QUERY_PORT, useExisting: UserAlbumsState },
    { provide: GET_USER_DETAILS_QUERY_PORT, useExisting: UserAlbumsState },
    { provide: INIT_DETAILS_COMMAND_PORT, useExisting: UserAlbumsState },
    { provide: GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT, useExisting: UserAlbumsState },
    { provide: GET_ALL_PHOTOS_QUERY_PORT, useExisting: UserAlbumsState },
    { provide: UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT, useExisting: UserAlbumsState }
  ],
})
export class UserAlbumsStateModule { }
