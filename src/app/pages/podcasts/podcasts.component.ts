import { Component, inject, OnInit } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';
import { PodcastService } from '../../services/podcast.service';
import { Podcast } from '../../interfaces/podcast';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent implements OnInit {
  private podcastService = inject(PodcastService);
  podcasts: Podcast[] = [];
  ngOnInit(): void {
    this.getPodcasts()
  }
  getPodcasts() {
    this.podcastService.getPodcasts().subscribe({
      next: (data: any) => {
        this.podcasts = this.podcastService.configPodcasts(data)
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
}
