import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { booleanAttribute, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiEndpoint = `https://api.spotify.com/v1`
  private http = inject(HttpClient);
  private headers = new HttpHeaders();

  constructor() {
  }

  getAlbums(): Observable<any> {
    const token = localStorage.getItem('access_token')
    this.headers = this.headers.set('Authorization', 'Bearer ' + token)
    return this.http.get(this.apiEndpoint + `/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc`, { headers: this.headers })
  }
}
