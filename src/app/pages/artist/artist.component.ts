import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../interfaces/artist';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit {
  private artistService = inject(ArtistService);
  artists : Artist [] = []
  ngOnInit(): void {
    this.getAllArtist()
  }
  getAllArtist(){
   this.artistService.getAllArtist().subscribe({
    next: ( data ) => {
      this.artists = this.artistService.configArtists(data) },
    error: (err) => {
      console.error(err);
      
    }
   })
  }


}
