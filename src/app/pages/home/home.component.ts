import { Component } from '@angular/core';
import { CardItemComponent } from '../../layout/card-item/card-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
