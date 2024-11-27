import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL, convertAlbumSpotifiy, shuffleArray } from '../shared/shared-services';
import { albumsTracksDB } from './data-mocks/albums-mock';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private http = inject(HttpClient)
  constructor() { }

  getAllAlbum(limitNumber: number = 50): Observable<any>{
    return this.http.get<any>(`${API_URL}/albums`)
      .pipe(
        catchError(
          (error: any) => {
            console.error('get albums error');
            return (error)
          }
        )
      )
  }

  configAlbums(respItems: any) {

    let userAlbums = []
    for (let i = 0; i < respItems.length; i++) {

      let currentAlbum = respItems[i].album;

      userAlbums.push(convertAlbumSpotifiy(currentAlbum))

    }
    return userAlbums;
  }

}
