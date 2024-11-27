import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { HomeService } from '../../services/home.service';
import { Track } from '../../interfaces/track';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 private homeService = inject(HomeService)
 tracks : Track [] = []
 ngOnInit(): void {
 this.getRecentlyPlayers()
}

 getRecentlyPlayers(){
  this.homeService.getTrackRecentlyPlayer().subscribe({
    next: (data) => {
      this.tracks = this.homeService.configTracks(data)

      console.log(this.tracks);
      
    },
    error : (err : Error) =>{
      console.error(err);
      
    }
  })
 }
}
