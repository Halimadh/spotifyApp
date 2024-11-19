import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { ServicesService } from '../../services/services.service';

interface Album {
  name: string;
  artist: string;
  image_url: string;
}

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  private services = inject(ServicesService);
  albums: Album[]=[]
  ngOnInit(): void {
    // this.getAlbums()
    }
// getAlbums(){
//  this.services.getAlbums().subscribe({
//   next: ( data ) => {
//  for(let d of data.albums){
//    const newAlbum : Album = {name: d.name, artist: d.artists[0].name, image_url: d.images[0].url}
//       this.albums.push(newAlbum)
//     }
//     console.log(this.albums)
//   },
//   error: (err) => {
//     console.error(err);
    
//   }
//  })
// }
}
