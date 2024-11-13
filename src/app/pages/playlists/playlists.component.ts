import { Component } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent {

}
