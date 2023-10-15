import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoQuery } from './photo.query';

export const GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT =
  new InjectionToken<GetPhotosForSpecificUserQueryPort>(
    'GET_PHOTOS_FOR_SPECIFIC_USER_QUERY_PORT'
  );

export interface GetPhotosForSpecificUserQueryPort {
  getPhotosForSpecificUser(userId: string): Observable<PhotoQuery[]>;
}
