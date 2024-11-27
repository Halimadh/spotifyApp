import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../interfaces/track';
import { SecondToDurationFormat, showErrorMessage } from '../../shared/shared-services';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sliderTimer: any;
  private canPlayNext: boolean = false;
  private audioElement!: HTMLAudioElement;
  private isPlaying$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isPlayingTrack$ = this.isPlaying$.asObservable();
  private currentTrack$: BehaviorSubject<Track> = new BehaviorSubject({} as Track);
  public currentPlayingTrack$ = this.currentTrack$.asObservable();
  private currentTrackMinutePlayed$: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public currentPlayingTrackMinutePlayed$ = this.currentTrackMinutePlayed$.asObservable();
  private currentTrackMinuteLeft$: BehaviorSubject<string> = new BehaviorSubject("00:30");
  public currentPlayingTrackMinuteLeft$ = this.currentTrackMinuteLeft$.asObservable();
  private currentTrackSliderPosition$: BehaviorSubject<string> = new BehaviorSubject("0");
  public currentPlayingTrackSliderPosition$ = this.currentTrackSliderPosition$.asObservable();
  private currentTrackVolume$: BehaviorSubject<string> = new BehaviorSubject("1");
  public currentPlayingTrackVolume$ = this.currentTrackVolume$.asObservable();


  currentPlaylistAudio: Track[] = [];

  constructor() {
    const eltAudio = document.createElement("audio")
    this.audioElement = eltAudio;
    this.audioElement.addEventListener("ended", () => {
      this.isPlaying$.next(false);
      clearInterval(this.sliderTimer);
      this.changeTimePlayer(0)
      this.configTrackSliderPlayer(this)
      this.configTrackSliderPlayerParams(0,"00:30","00:00");
      if(this.canPlayNext == true) {
        let nextTrack = this.getNextTrackAudio(this.currentTrack$.value.id);
        if(nextTrack)
        {
          this.playTrack(nextTrack)
        }
      }
    })
  }

  configTrackSliderPlayer(mainThis: any) {
    let position = 0;

    // update slider position
    if (!isNaN(mainThis.audioElement?.duration)) {
      position = mainThis.audioElement.currentTime * (100 / mainThis.audioElement.duration);
      mainThis.configTrackSliderPlayerParams(
          position, 
          SecondToDurationFormat(mainThis.audioElement.duration - mainThis.audioElement.currentTime),
          SecondToDurationFormat(mainThis.audioElement.currentTime)
      );

      // mainThis.currentTrackMinutePlayed$.next(SecondToDurationFormat(mainThis.audioElement.currentTime));
      // mainThis.currentTrackMinuteLeft$.next("- " + SecondToDurationFormat(mainThis.audioElement.duration - mainThis.audioElement.currentTime));
      // mainThis.currentTrackSliderPosition$.next(position.toString())
    }

  }
  configTrackSliderPlayerParams(
      sliderPositionValue : any,
      minuteLeftValue : any,
      minutePlayedValue : any,
      ) {
        
        this.currentTrackMinutePlayed$.next(minutePlayedValue);
        this.currentTrackMinuteLeft$.next(minuteLeftValue);
        this.currentTrackSliderPosition$.next(sliderPositionValue)
      }

   playTrack(track: Track, canPlayTrack : boolean = true): boolean {
    if (!this.audioElement) {
      throw new Error("Audio Element is not define")
    }

    clearInterval(this.sliderTimer);

    this.currentTrack$.next(track)
    this.configTrackSliderPlayerParams(0,"00:30","00:00");
    if(track?.previewUrl)
    {
      this.audioElement.src = track.previewUrl;
      this.audioElement.load();
      this.currentTrackSliderPosition$.next("0")
      if(canPlayTrack){
        this.audioElement.play();
        this.isPlaying$.next(true);
        this.configTimerPlayer() 
      }
      else 
        this.canPlayNext = false;
        
  
      return true
    }
    else{
      this.audioElement.currentTime = 0;
      this.audioElement.src = "";
      this.audioElement?.pause()
      this.isPlaying$.next(false)
      
      if(canPlayTrack)
        showErrorMessage("Spotify Does Not Allow To Play This Track : " + track?.title)
      return false
    }
  }

  configTimerPlayer() {
    let mainThis = this;
    this.sliderTimer = setInterval(
      function () {
        mainThis.configTrackSliderPlayer(mainThis);
      },
      1000);

  }

  // change slider position 
  async changeTimePlayer(value: any): Promise<void> {
    if(this.audioElement?.src.length > 0)
    {
      let sliderPosition = this.audioElement.duration * (value / 100);
      this.currentTrackSliderPosition$.next(sliderPosition.toString())
      this.audioElement.currentTime = sliderPosition;
      this.audioElement.pause()
      this.isPlaying$.next(false)
    }
  }

  // change volume audio 
  async changeVolumeAudio(value: any): Promise<void> {
      this.currentTrackVolume$.next(value)
      if(this.audioElement.src.length > 0){
        this.audioElement.volume = value;
      }
  }

  async togglePlay(): Promise<void> {
    
    if (!isNaN(this.audioElement?.duration)) {
      if (this.audioElement.paused && this.audioElement.currentTime == 0) {
        this.audioElement.play();
        this.isPlaying$.next(true)
        this.configTimerPlayer()
      }
      else if (this.audioElement.paused) {
        this.audioElement.play();
        this.isPlaying$.next(true)
      }
      else {
        this.audioElement.pause()
        this.isPlaying$.next(false)
      }
    }
    else {
      if(this.currentTrack$?.value?.title)
        showErrorMessage("Spotify Does Not Allow To Play This Track : " + this.currentTrack$?.value?.title)
      else
        showErrorMessage("Please choose a track")
    }
  }
  sleep(ms : any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async setCurrentPlaylistAudio(tracks: Track[]){
    if(tracks.length > 0)
    {
      let i = 0;
      let canPlay = false;
      do {

        this.currentPlaylistAudio = tracks;
        this.currentTrack$.next(tracks[i])
        canPlay = this.playTrack(tracks[i])
        i++;
             
        await this.sleep(2000);
      } while (i < tracks.length && canPlay == false)
      
      if(canPlay == true)
        this.canPlayNext = true;
    }
    else
      showErrorMessage("Playlist empty")
  }

  isTrackPlaying() {
    return this.isPlaying$.value;
  }
  getCurrentPlaylistAudio(){
    return this.currentPlaylistAudio;
  }

  setCurrentTrack(track: Track) {
    this.currentTrack$.next(track)
  }

  getNextTrackAudio(idCurrentTrack : any) {

    let nextTrack = undefined;
    if(this.currentPlaylistAudio)
    {
      let indexCurrentTrack = this.currentPlaylistAudio.findIndex(elt => elt.id === idCurrentTrack)
  
      if(indexCurrentTrack == -1){
        nextTrack = undefined;
      }
      else if(indexCurrentTrack == (this.currentPlaylistAudio.length -1) )
      {
        nextTrack = this.currentPlaylistAudio?.[0];
      }
      else {
        nextTrack = this.currentPlaylistAudio[indexCurrentTrack+1];
      }  

    }
    return nextTrack;

  }

  getPrevTrackAudio(idCurrentTrack : any) {

    let nextTrack = undefined;
    if(this.currentPlaylistAudio)
    {
      let indexCurrentTrack = this.currentPlaylistAudio?.findIndex(elt => elt.id === idCurrentTrack)

      if(indexCurrentTrack == -1){
        nextTrack = undefined;
      }
      else if(indexCurrentTrack == 0 )
      {
        nextTrack = this.currentPlaylistAudio?.[(this.currentPlaylistAudio.length -1)];
      }
      else {
        nextTrack = this.currentPlaylistAudio[indexCurrentTrack-1];
      }      
        
    }

    return nextTrack;

  }

}
