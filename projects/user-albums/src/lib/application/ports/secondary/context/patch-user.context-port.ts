import { InjectionToken } from '@angular/core';
import { UserDTO } from '../dto/user.dto';
import { Observable } from 'rxjs';

export const PATCH_USER_CONTEXT_PORT = new InjectionToken<PatchUserContextPort>(
  'PATCH_USER_CONTEXT_PORT'
);

export interface PatchUserContextPort {
  patch(state: Partial<UserDTO>): Observable<void>;
}
