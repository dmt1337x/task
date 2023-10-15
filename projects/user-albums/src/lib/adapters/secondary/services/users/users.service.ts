import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllUsersDtoPort } from '../../../../application/ports/secondary/dto/get-all-users.dto-port';
import { GetOneUserDtoPort } from '../../../../application/ports/secondary/dto/get-one-user.dto-port';
import { UserDTO } from '../../../../application/ports/secondary/dto/user.dto';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService implements GetAllUsersDtoPort, GetOneUserDtoPort {
  constructor(private _httpClient: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    return this._httpClient.get<UserDTO[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }

  getOneUser(id: number): Observable<UserDTO> {
    return this._httpClient.get<UserDTO>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
