import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoDTO } from './photo.dto';

export const GET_ALL_PHOTOS_DTO_PORT = new InjectionToken<GetAllPhotosDtoPort>(
  'GET_ALL_PHOTOS_DTO_PORT'
);

export interface GetAllPhotosDtoPort {
  getAllPhotos(page?: number, limit?: number): Observable<PhotoDTO[]>;
}
