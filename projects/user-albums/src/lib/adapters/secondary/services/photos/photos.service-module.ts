import { NgModule } from '@angular/core';
import { PhotosService } from './photos.service';
import { GET_ALL_PHOTOS_DTO_PORT } from '../../../../application/ports/secondary/dto/get-all-photos.dto-port';

@NgModule({
  providers: [
    PhotosService,
    {
      provide: GET_ALL_PHOTOS_DTO_PORT,
      useExisting: PhotosService,
    },
  ],
})
export class PhotosServiceModule {}
