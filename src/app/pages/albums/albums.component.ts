import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { ServicesService } from '../../shared/services.service';
import { NavbarVertivalComponent } from '../../layout/navbar-vertival/navbar-vertival.component';
import { NavbarHorizontalComponent } from '../../layout/navbar-horizontal/navbar-horizontal.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  private services = inject(ServicesService);
  ngOnInit(): void {
    this.getAlbums()
    }
getAlbums(){
  this.services.getAlbums().subscribe((res:any) =>{
    console.log(res)
  })
}
}
