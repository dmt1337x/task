import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoQuery } from './photo.query';

export const GET_ALL_PHOTOS_QUERY_PORT =
  new InjectionToken<GetAllPhotosQueryPort>('GET_ALL_PHOTOS_QUERY_PORT');

export interface GetAllPhotosQueryPort {
  getAllPhotos(): Observable<PhotoQuery[]>;
}
