import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecificPropertyCommand } from './specific-property.command';

export const UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT =
  new InjectionToken<UpdateSpecificPropertyCommandPort>(
    'UPDATE_SPECIFIC_PROPERTY_COMMAND_PORT'
  );

export interface UpdateSpecificPropertyCommandPort {
  updateSpecificProperty(command: SpecificPropertyCommand): Observable<void>;
}
