import { Component, Input, input, OnInit } from '@angular/core';
import { BtnPlayComponent } from '../btn-play/btn-play.component';
import { ICardItem } from '../../interfaces/icard-item';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [BtnPlayComponent],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent implements OnInit{

@Input() cardItem !: ICardItem;
@Input() isItemTrack: boolean = false;

ngOnInit(): void {
  
}
goToLink(){
  debugger;
  if(!this.isItemTrack && this.cardItem.linkUrl )
    window.open(this.cardItem?.linkUrl, '_blank')?.focus();
}

}
