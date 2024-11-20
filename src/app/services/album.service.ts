import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { convertAlbumSpotifiy, shuffleArray } from '../shared/shared-services';
import { albumsTracksDB } from './data-mocks/albums-mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor() { }

  getAllAlbum(limitNumber: number = 50): Observable<any>{
    let allDB = shuffleArray(albumsTracksDB).slice(0, limitNumber)
    return of(allDB);
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
