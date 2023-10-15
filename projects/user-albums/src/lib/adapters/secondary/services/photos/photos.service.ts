import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllPhotosDtoPort } from '../../../../application/ports/secondary/dto/get-all-photos.dto-port';
import { PhotoDTO } from '../../../../application/ports/secondary/dto/photo.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotosService implements GetAllPhotosDtoPort {
  constructor(private _httpClient: HttpClient) {}

  getAllPhotos(): Observable<PhotoDTO[]> {
    return this._httpClient.get<PhotoDTO[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }
}
