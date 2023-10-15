import { InjectionToken } from '@angular/core';
import { UserDTO } from '../dto/user.dto';
import { Observable } from 'rxjs';

export const SELECT_USER_CONTEXT_PORT =
  new InjectionToken<SelectUserContextPort>('SELECT_USER_CONTEXT_PORT');

export interface SelectUserContextPort {
  select$: Observable<UserDTO>;
}
