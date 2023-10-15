import { InjectionToken } from '@angular/core';
import { UserDTO } from '../dto/user.dto';
import { Observable } from 'rxjs';

export const SET_STATE_USER_CONTEXT_PORT =
  new InjectionToken<SetStateUserContextPort>('SET_STATE_USER_CONTEXT_PORT');

export interface SetStateUserContextPort {
  setState(state: Partial<UserDTO>): Observable<void>;
}
