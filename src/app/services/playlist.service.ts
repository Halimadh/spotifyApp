import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_URL, convertPlaylistSpotifiy, shuffleArray } from '../shared/shared-services';
import { madeForYouTracksDB } from './data-mocks/playlists-mock';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private http = inject(HttpClient)
  constructor() { }

  getAllPlaylist(limitNumber: number = 50): Observable<any> {
    let allPlaylist = shuffleArray(madeForYouTracksDB).slice(0, limitNumber)
    return of(allPlaylist)
  }

  getPlaylists(): Observable<any> {
    return this.http.get<any>(`${API_URL}/playlists`)
      .pipe(
        catchError(
          (error: any) => {
            console.error('get playlist error');
            return (error)
          }
        )
      )
  }

  configPlaylists(respItems: any) {

    let userPlaylists = [];
    for (let i = 0; i < respItems.length; i++) {

      let currentPlaylist = respItems[i];

      userPlaylists.push(convertPlaylistSpotifiy(currentPlaylist))
    }
    return userPlaylists;
  }
}
