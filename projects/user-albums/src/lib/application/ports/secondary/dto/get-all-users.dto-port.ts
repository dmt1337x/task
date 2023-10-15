import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from './user.dto';

export const GET_ALL_USERS_DTO_PORT = new InjectionToken<GetAllUsersDtoPort>(
  'GET_ALL_USERS_DTO_PORT'
);

export interface GetAllUsersDtoPort {
  getAllUsers(): Observable<UserDTO[]>;
}
