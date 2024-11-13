import { Component } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent {

}
