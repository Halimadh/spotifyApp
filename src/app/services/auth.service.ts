import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI } from '../shared/shared-services';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private clientId = '76f18c24b19a449c887f5eee07da4ca7';
  private clientSecret = '3f8a77b6ada24d7682f2ab4f7b2bedc8';
  private http = inject(HttpClient);

  constructor() { }

  ngOnInit(): void { }
  private scopesUser = [
    "user-read-recently-played",
    "user-library-read", // ====> Liked Songs, Albums, Shows
    "playlist-read-private",
    "user-follow-read",
    "playlist-modify-public", "playlist-modify-private" // ===> create playlist
  ];
  
  private loginEndpoint: string = `${AUTH_ENDPOINT}client_id=${CLIENT_ID}` +
  `&redirect_uri=${REDIRECT_URI}` +
  `&scope=${this.scopesUser.join("%20")}` +
  `&response_type=token&show_dialog=true`

  // getToken(){
  //   const _headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
  //   });
  //   const body = new HttpParams().set('code', 'authorization_code');
  //   const body = new HttpParams().set('grant_type', 'authorization_code');
  //   const body = new HttpParams().set('grant_type', 'authorization_code');
  //   return this.http.post(
  //     'https://accounts.spotify.com/api/token',
  //     body.toString(),
  //     { headers: _headers }
  //   );
  // }

  login() {
      localStorage.setItem('isLogger','true')
  }

  logout() {
    localStorage.removeItem('isLogger');
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('isLogger')) {
      return true;
    }
    return false;
  }
}
