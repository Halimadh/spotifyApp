import { Component, inject, OnInit } from '@angular/core';

import { AudioService } from '../../services/audio/audio.service';
import { showErrorMessage } from '../../shared/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-play',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './bottom-play.component.html',
  styleUrls: ['./bottom-play.component.css']
})
export class BottomPlayComponent implements OnInit {
 private audioService = inject(AudioService)
  isTrackPlaying$ = this.audioService.isPlayingTrack$;
  currentTrackPlaying$ = this.audioService.currentPlayingTrack$;
  currentTrackPlayingMinuteLeft$ = this.audioService.currentPlayingTrackMinuteLeft$;
  currentTrackPlayingMinutePlayed$ = this.audioService.currentPlayingTrackMinutePlayed$;
  currentTrackPlayingSliderPosition$ = this.audioService.currentPlayingTrackSliderPosition$;
  currentTrackPlayingVolume$ = this.audioService.currentPlayingTrackVolume$;
  // constructor(private audioService: AudioService,) { }

  ngOnInit(): void {
  }

  goToLink(linkSpotify : any){
    if(linkSpotify)
      window.open(linkSpotify, '_blank')?.focus();
    else
      showErrorMessage("Please, choose a track")
  }
  async togglePlay() {
    this.audioService.togglePlay()
  }
  
  async changeSliderTime(value : any) {
    this.audioService.changeTimePlayer(value.target.value)
  }

  async changeVolumePlayer(value : any) {
    this.audioService.changeVolumeAudio(value.target.value)
  }
  
  async playNextTrack(idCurrentTrack: any) {
    let nextTrack = this.audioService.getNextTrackAudio(idCurrentTrack);
    
    if(nextTrack)
    {
      this.audioService.playTrack(nextTrack)
    }
    else
      showErrorMessage("Please choose a playlist")

  }

  async playPrevTrack(idCurrentTrack: any) {
    let prevTrack = this.audioService.getPrevTrackAudio(idCurrentTrack);
    
    if(prevTrack)
    {
      this.audioService.playTrack(prevTrack)
    }
    else
      showErrorMessage("Please choose a playlist")

  }

}
