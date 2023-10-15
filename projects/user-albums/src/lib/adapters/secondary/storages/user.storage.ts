import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PatchUserContextPort } from '../../../application/ports/secondary/context/patch-user.context-port';
import { SelectUserContextPort } from '../../../application/ports/secondary/context/select-user.context-port';
import { SetStateUserContextPort } from '../../../application/ports/secondary/context/set-state-user.context-port';
import { UserDTO } from '../../../application/ports/secondary/dto/user.dto';

@Injectable()
export class UserStorage
  implements
    PatchUserContextPort,
    SelectUserContextPort,
    SetStateUserContextPort
{
  private userSubject: ReplaySubject<UserDTO> = new ReplaySubject<UserDTO>(1);

  readonly select$: Observable<UserDTO> = this.userSubject.asObservable();

  setState(state: UserDTO): Observable<void> {
    this.userSubject.next(state);

    return of(void 0);
  }

  patch(state: Partial<UserDTO>): Observable<void> {
    return this.userSubject.pipe(
      take(1),
      map((context: UserDTO) => this.userSubject.next({ ...context, ...state }))
    );
  }
}
