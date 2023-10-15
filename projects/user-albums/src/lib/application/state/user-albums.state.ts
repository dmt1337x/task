import { Inject, Injectable } from '@angular/core';
import { combineLatest, combineLatestWith, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GetAllUsersQueryPort } from '../ports/primary/query/get-all-users.query-port';
import { GetUserDetailsQueryPort } from '../ports/primary/query/get-user-details.query-port';
import { InitDetailsCommandPort } from '../ports/primary/command/init-details.command-port';
import { GetPhotosForSpecificUserQueryPort } from '../ports/primary/query/get-photos-for-specific-user.query-port';
import { GetAllPhotosQueryPort } from '../ports/primary/query/get-all-photos.query-port';
import { UpdateSpecificPropertyCommandPort } from '../ports/primary/command/update-specific-property.command-port';
import {
  GET_ALL_USERS_DTO_PORT,
  GetAllUsersDtoPort,
} from '../ports/secondary/dto/get-all-users.dto-port';
import {
  GET_ONE_USER_DTO_PORT,
  GetOneUserDtoPort,
} from '../ports/secondary/dto/get-one-user.dto-port';
import {
  PATCH_USER_CONTEXT_PORT,
  PatchUserContextPort,
} from '../ports/secondary/context/patch-user.context-port';
import {
  SELECT_USER_CONTEXT_PORT,
  SelectUserContextPort,
} from '../ports/secondary/context/select-user.context-port';
import {
  GET_ALL_PHOTOS_DTO_PORT,
  GetAllPhotosDtoPort,
} from '../ports/secondary/dto/get-all-photos.dto-port';
import {
  SET_STATE_USER_CONTEXT_PORT,
  SetStateUserContextPort,
} from '../ports/secondary/context/set-state-user.context-port';
import { UserQuery } from '../ports/primary/query/user.query';
import { UserDTO } from '../ports/secondary/dto/user.dto';
import { PhotoQuery } from '../ports/primary/query/photo.query';
import { PhotoDTO } from '../ports/secondary/dto/photo.dto';
import { SpecificPropertyCommand } from '../ports/primary/command/specific-property.command';
import { avatarMapper } from '../mappers/avatar.mapper';

@Injectable()
export class UserAlbumsState
  implements
    GetAllUsersQueryPort,
    GetUserDetailsQueryPort,
    InitDetailsCommandPort,
    GetPhotosForSpecificUserQueryPort,
    GetAllPhotosQueryPort,
    UpdateSpecificPropertyCommandPort
{
  constructor(
    @Inject(GET_ALL_USERS_DTO_PORT)
    private _getAllUsersDtoPort: GetAllUsersDtoPort,
    @Inject(GET_ONE_USER_DTO_PORT)
    private _getOneUserDtoPort: GetOneUserDtoPort,
    @Inject(PATCH_USER_CONTEXT_PORT)
    private _patchUserContextPort: PatchUserContextPort,
    @Inject(SELECT_USER_CONTEXT_PORT)
    private _selectUserContextPort: SelectUserContextPort,
    @Inject(GET_ALL_PHOTOS_DTO_PORT)
    private _getAllPhotosDtoPort: GetAllPhotosDtoPort,
    @Inject(SET_STATE_USER_CONTEXT_PORT)
    private _setStateUserContextPort: SetStateUserContextPort
  ) {}

  getAllUsers(): Observable<UserQuery[]> {
    return this._getAllUsersDtoPort
      .getAllUsers()
      .pipe(
        map((allUsers: UserDTO[]) =>
          allUsers.map((user) => this.mapToUserQuery(user))
        )
      );
  }

  initDetails(id: number): Observable<void> {
    return this._getOneUserDtoPort
      .getOneUser(id)
      .pipe(
        switchMap((user: UserDTO) =>
          this._setStateUserContextPort.setState(user)
        )
      );
  }

  getUserDetails(): Observable<UserQuery> {
    return this._selectUserContextPort.select$.pipe(
      map((user: UserDTO) => this.mapToUserQuery(user))
    );
  }

  getPhotosForSpecificUser(userId: string): Observable<PhotoQuery[]> {
    return this._getAllPhotosDtoPort.getAllPhotos().pipe(
      map((photos: PhotoDTO[]) =>
        photos.filter((photo) => photo.albumId === +userId)
      ),
      combineLatestWith(this._selectUserContextPort.select$),
      map(([photos, userContext]: [PhotoDTO[], UserDTO]) =>
        photos.map(
          (photo: PhotoDTO) =>
            new PhotoQuery(
              userContext.name,
              photo.albumId,
              photo.title,
              photo.thumbnailUrl,
              Math.floor(Math.random() * 100)
            )
        )
      )
    );
  }

  getAllPhotos(page?: number, limit?: number): Observable<PhotoQuery[]> {
    return combineLatest([
      this._getAllPhotosDtoPort.getAllPhotos(page, limit),
      this._getAllUsersDtoPort.getAllUsers(),
    ]).pipe(
      map(([photos, users]) => {
        const mapper: { [userId: number]: string } = {};

        users.map((user) => {
          mapper[user.id] = `${user.name} ${user.username}`;
        });

        return photos.map(
          (photo) =>
            new PhotoQuery(
              mapper[photo.albumId],
              photo.albumId,
              photo.title,
              photo.thumbnailUrl,
              Math.floor(Math.random() * 100)
            )
        );
      })
    );
  }

  updateSpecificProperty(command: SpecificPropertyCommand): Observable<void> {
    return this._patchUserContextPort.patch({
      [command.propertyName]: command.value,
    });
  }

  private mapToUserQuery(user: UserDTO): UserQuery {
    return new UserQuery(
      user.id,
      avatarMapper[user.id],
      user.name,
      user.username,
      user.email,
      user.phone,
      user.website
    );
  }
}
