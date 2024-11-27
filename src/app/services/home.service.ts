import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { API_URL, convertTrackSpotifiy } from '../shared/shared-services';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
private http = inject(HttpClient)
  constructor() { }
 getTrackRecentlyPlayer ():Observable<any>{
  return this.http.get<any>(`${API_URL}/recentlyPlayers`)
  .pipe(
    catchError(
      (error: any) => {
        console.error('get podcasts error');
        return (error)
      }
    )
  )
 }
 configTracks(respItems: any) {
  let uniqueIdTrack = ""
  let tracks = []
  for (let i = 0; i < respItems.length; i++) {

    if (respItems[i]) {

      let currentTrack = convertTrackSpotifiy(respItems[i]);

      if (uniqueIdTrack.includes(currentTrack.id.toString()) == false){
        if(respItems[i].added_at)
          currentTrack.date = respItems[i].added_at.split("T")[0];
        tracks.push(currentTrack)

      }

      uniqueIdTrack += currentTrack.id + ";"
    }
  }
  return tracks;
}
}
