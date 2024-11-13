import { Component } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';

@Component({
  selector: 'app-podcasts',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './podcasts.component.html',
  styleUrl: './podcasts.component.css'
})
export class PodcastsComponent {

}
