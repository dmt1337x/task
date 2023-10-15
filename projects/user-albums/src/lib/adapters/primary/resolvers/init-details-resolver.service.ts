import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {
  INIT_DETAILS_COMMAND_PORT,
  InitDetailsCommandPort,
} from '../../../application/ports/primary/command/init-details.command-port';
import { map } from 'rxjs/operators';

@Injectable()
export class InitDetailsResolver implements Resolve<void> {
  constructor(
    @Inject(INIT_DETAILS_COMMAND_PORT)
    private _initDetailsCommandPort: InitDetailsCommandPort
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<void> {
    return this._initDetailsCommandPort
      .initDetails(route.params['userId'])
      .pipe(map(() => void 0));
  }
}
