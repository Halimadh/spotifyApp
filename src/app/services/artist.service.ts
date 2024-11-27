import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { artistsTracksDB } from './data-mocks/artists-mock';
import { API_URL, convertArtistSpotifiy, shuffleArray } from '../shared/shared-services';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
 private http = inject(HttpClient)
  constructor() { }

  getAllArtist(limitNumber:number = 50): Observable<any>{
    return this.http.get<any>(`${API_URL}/artists`)
      .pipe(
        catchError(
          (error: any) => {
            console.error('get artists error');
            return (error)
          }
        )
      )


  //  let allArtist = shuffleArray(artistsTracksDB).slice(0, limitNumber)
  //  return of(allArtist)
  }

  configArtists(respItems: any, limit? : number) {

    let userArtists = []
    for (let i = 0; i < respItems.length; i++) {
      
      if(i == limit)
        break;
      
      let currentArtist = respItems[i];

      userArtists.push(convertArtistSpotifiy(currentArtist))

    }
    return userArtists;

  }
}
