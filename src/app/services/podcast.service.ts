import { inject, Injectable } from '@angular/core';
import { API_URL, convertPodcastSpotifiy, shuffleArray } from '../shared/shared-services';
import { catchError, Observable, of } from 'rxjs';
import { showTracksDB } from './data-mocks/podcasts-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  private http = inject(HttpClient)
  constructor() { }

  getAllPodcast(limitNumber: number = 50): Observable<any> {
    let allPodcast = shuffleArray(showTracksDB).slice(0, limitNumber)
    return of(allPodcast)
  }
  getPodcasts(): Observable<any> {
    return this.http.get<any>(`${API_URL}/podcasts`)
      .pipe(
        catchError(
          (error: any) => {
            console.error('get podcasts error');
            return (error)
          }
        )
      )
  }

  configPodcasts(respItems: any) {
    let userPodcasts = []
    for (let i = 0; i < respItems.length; i++) {
      let currentPodcast = respItems[i].show;
      userPodcasts.push(convertPodcastSpotifiy(currentPodcast))
    }
    return userPodcasts;
  }
}
