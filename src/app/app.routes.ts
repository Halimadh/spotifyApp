import { Routes } from '@angular/router';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { LoginComponent } from './pages/login/login.component';
import { FrontComponent } from './pages/front/front.component';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'front',
        component: FrontComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'albums', component: AlbumsComponent },
            { path: 'artists', component: ArtistComponent },
            { path: 'playlists', component: PlaylistsComponent },
            { path: 'podcasts', component: PodcastsComponent },
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }

];
