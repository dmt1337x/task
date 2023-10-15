import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuery } from './user.query';

export const GET_ALL_USERS_QUERY_PORT =
  new InjectionToken<GetAllUsersQueryPort>('GET_ALL_USERS_QUERY_PORT');

export interface GetAllUsersQueryPort {
  getAllUsers(): Observable<UserQuery[]>;
}
