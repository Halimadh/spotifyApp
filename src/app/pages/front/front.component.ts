import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarHorizontalComponent } from '../../layout/navbar-horizontal/navbar-horizontal.component';
import { NavbarVertivalComponent } from '../../layout/navbar-vertival/navbar-vertival.component';

@Component({
  selector: 'app-front',
  standalone: true,
  imports: [RouterOutlet,NavbarHorizontalComponent,NavbarVertivalComponent],
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {

}
