import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const INIT_DETAILS_COMMAND_PORT =
  new InjectionToken<InitDetailsCommandPort>('INIT_DETAILS_COMMAND_PORT');

export interface InitDetailsCommandPort {
  initDetails(id: number): Observable<void>;
}
