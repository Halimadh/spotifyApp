import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { booleanAttribute, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiEndpoint = `https://api.spotify.com/v1`
  private clientId = '76f18c24b19a449c887f5eee07da4ca7';
  private clientSecret = '3f8a77b6ada24d7682f2ab4f7b2bedc8';
  private http = inject(HttpClient);
  private headers = new HttpHeaders();
  token: string = '';
  constructor() {
  }

  // private methods
  getToken(): Observable<any> {
    const _headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
  });
  const body = new HttpParams().set('grant_type', 'client_credentials');
  
  return this.http.post(
      'https://accounts.spotify.com/api/token', 
      body.toString(), 
      { headers: _headers }
  );

  }
  getAlbums(): Observable<any> {
    this.getToken().subscribe((res:any) => {
      this.token = res.access_token
      this.headers = this.headers.set('Authorization', 'Bearer ' + this.token)
      
    })
    return this.http.get(this.apiEndpoint + `/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc`, { headers: this.headers })
  }
}
