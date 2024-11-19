import { Routes } from '@angular/router';
import { AlbumsComponent } from './pages/albums/albums.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistsComponent } from './pages/playlists/playlists.component';
import { PodcastsComponent } from './pages/podcasts/podcasts.component';
import { LoginComponent } from './pages/login/login.component';
import { FrontComponent } from './pages/front/front.component';
import { authGuard, isloggingGuard} from './guards/auth.guard';


export const routes: Routes = [
    { path: '', redirectTo:'login', pathMatch: 'full' },
    { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [isloggingGuard]
    },
    {
        path: '',
        component: FrontComponent,
        canActivate:[authGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'albums', component: AlbumsComponent },
            { path: 'artists', component: ArtistComponent },
            { path: 'playlists', component: PlaylistsComponent },
            { path: 'podcasts', component: PodcastsComponent },
        ]
    },
    

];
