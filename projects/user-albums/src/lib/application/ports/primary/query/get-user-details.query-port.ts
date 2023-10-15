import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserQuery } from './user.query';

export const GET_USER_DETAILS_QUERY_PORT =
  new InjectionToken<GetUserDetailsQueryPort>('GET_USER_DETAILS_QUERY_PORT');

export interface GetUserDetailsQueryPort {
  getUserDetails(): Observable<UserQuery>;
}
