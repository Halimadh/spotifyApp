import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { ServicesService } from '../../services/services.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../interfaces/album';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  private albumService = inject(AlbumService);
  albums: Album[]=[]
  ngOnInit(): void {
     this.getAlbums()
    }
getAlbums(){
 this.albumService.getAllAlbum().subscribe({
  next: ( data ) => {
    this.albums = this.albumService.configAlbums(data)
//  for(let d of data.albums){
//    const newAlbum : Album = {name: d.name, artist: d.artists[0].name, image_url: d.images[0].url}
//       this.albums.push(newAlbum)
//     }
//     console.log(this.albums)
   },
  error: (err) => {
    console.error(err);
    
  }
 })
}
}
