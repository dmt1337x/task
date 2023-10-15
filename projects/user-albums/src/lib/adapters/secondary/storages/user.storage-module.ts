import { NgModule } from '@angular/core';
import { UserStorage } from './user.storage';
import { PATCH_USER_CONTEXT_PORT } from '../../../application/ports/secondary/context/patch-user.context-port';
import { SELECT_USER_CONTEXT_PORT } from '../../../application/ports/secondary/context/select-user.context-port';
import { SET_STATE_USER_CONTEXT_PORT } from '../../../application/ports/secondary/context/set-state-user.context-port';

@NgModule({
  providers: [
    UserStorage,
    { provide: PATCH_USER_CONTEXT_PORT, useExisting: UserStorage },
    { provide: SELECT_USER_CONTEXT_PORT, useExisting: UserStorage },
    { provide: SET_STATE_USER_CONTEXT_PORT, useExisting: UserStorage }
  ],
})
export class UserStorageModule { }
