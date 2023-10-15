import { NgModule } from '@angular/core';
import { UsersService } from './users.service';
import { GET_ALL_USERS_DTO_PORT } from '../../../../application/ports/secondary/dto/get-all-users.dto-port';
import { GET_ONE_USER_DTO_PORT } from '../../../../application/ports/secondary/dto/get-one-user.dto-port';

@NgModule({
  providers: [
    UsersService,
    { provide: GET_ALL_USERS_DTO_PORT, useExisting: UsersService },
    { provide: GET_ONE_USER_DTO_PORT, useExisting: UsersService },
  ],
})
export class UsersServiceModule {}
