import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../interfaces/playlist';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent implements OnInit {
  private playlistService = inject(PlaylistService)
  playlists: Playlist[] = []
  ngOnInit(): void {
    this.getPlaylists()
  }
  getPlaylists() {
    this.playlistService.getPlaylists().subscribe({
      next: (data: any) => {
        this.playlists = this.playlistService.configPlaylists(data)
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
}
