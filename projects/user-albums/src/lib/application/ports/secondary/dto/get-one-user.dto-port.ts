import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from './user.dto';

export const GET_ONE_USER_DTO_PORT = new InjectionToken<GetOneUserDtoPort>(
  'GET_ONE_USER_DTO_PORT'
);

export interface GetOneUserDtoPort {
  getOneUser(id: number): Observable<UserDTO>;
}
