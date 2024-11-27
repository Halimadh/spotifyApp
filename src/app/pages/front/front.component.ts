import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarHorizontalComponent } from '../../layout/navbar-horizontal/navbar-horizontal.component';
import { NavbarVertivalComponent } from '../../layout/navbar-vertival/navbar-vertival.component';
import { BottomPlayComponent } from '../bottom-play/bottom-play.component';

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [RouterOutlet,NavbarHorizontalComponent,NavbarVertivalComponent,BottomPlayComponent],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
