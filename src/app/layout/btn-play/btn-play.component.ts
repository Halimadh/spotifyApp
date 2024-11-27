import { Component, inject, Input } from '@angular/core';
import 'boxicons'
import { Track } from '../../interfaces/track';
import { AudioService } from '../../services/audio/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-play',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-play.component.html',
  styleUrl: './btn-play.component.css'
})
export class BtnPlayComponent {
  @Input() currentTrackToPlay!: Track;
  private audioService = inject(AudioService)

  isTrackPlaying$ = this.audioService.isPlayingTrack$;
  currentTrackPlaying$ = this.audioService.currentPlayingTrack$;

 

  ngOnInit(): void {
  }

  async togglePlay() {
    this.audioService.togglePlay()
  }

  async playTrack() {    
    this.audioService.playTrack(this.currentTrackToPlay)
  }
}
