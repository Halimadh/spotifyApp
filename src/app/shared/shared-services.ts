import { Album } from "../interfaces/album";
import { Artist } from "../interfaces/artist";
import { Playlist } from "../interfaces/playlist";
import { Podcast } from "../interfaces/podcast";
import { Track } from "../interfaces/track";

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
export const BASE_URL = "https://api.spotify.com/v1";
export const API_URL = "http://localhost:3000";
/**
 * Local Params
 */
export const CLIENT_ID = "76f18c24b19a449c887f5eee07da4ca7";
export const BASE_URL_APP = "http://localhost:4200/";
export const REDIRECT_URI = "http://localhost:4200/home";



export let shuffleArray = (array : any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * array.length);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export let convertPlaylistSpotifiy = (spotifyPlaylist : any) : Playlist => {
    return {
        id: spotifyPlaylist.id,
        name : spotifyPlaylist.name,
        cover : spotifyPlaylist.images[0]?.url,
        description: spotifyPlaylist.description,
        linkUrl: spotifyPlaylist.external_urls?.spotify,
    }
}

export let convertAlbumSpotifiy = (spotifyAlbum : any) : Album => {
    return {
        id: spotifyAlbum.id,
        name : spotifyAlbum.name,
        cover : spotifyAlbum.images[0].url,
        artist: spotifyAlbum.artists[0].name,
        linkUrl: spotifyAlbum.external_urls?.spotify,
    }
}

export let convertArtistSpotifiy = (spotifyArtist : any) : Artist => {
    return {
        id: spotifyArtist.id,
        name : spotifyArtist.name,
        cover : spotifyArtist.images[0].url,
        linkUrl: spotifyArtist.external_urls?.spotify,
    }
}


export let convertPodcastSpotifiy = (spotifyPodcast : any) : Podcast => {
    return {
        id: spotifyPodcast.id,
        name : spotifyPodcast.name,
        cover : spotifyPodcast.images[0].url,
        publisher: spotifyPodcast.publisher,
        linkUrl: spotifyPodcast.external_urls?.spotify,
    }

}
export let convertTrackSpotifiy = (spotifyTrack : any, isTrackLiked: boolean = false) : Track => {
    return {
        id: spotifyTrack.id,
        imageCover: spotifyTrack.album.images[0].url,
        title: spotifyTrack.name,
        artist: spotifyTrack.artists[0].name,
        album: spotifyTrack.album.name,
        date: spotifyTrack.played_at?.split("T")[0],
        linkUrl: spotifyTrack.external_urls?.spotify,
        isLiked: isTrackLiked,
        duration: SecondToDurationFormat(spotifyTrack.duration_ms/ 1000),
        previewUrl: spotifyTrack.preview_url
    }
}  
export let SecondToDurationFormat = (duration : any ) => {
    let durationFormat = "";
    if(duration)
    {
        let hour = Math.floor(duration / 3600);
        let minute = Math.floor((duration % 3600) / 60);
        let second = Math.floor(duration % 60);
    
        if (hour > 0) {
            durationFormat += (hour < 10 ? "0" + hour : hour) + ":";
        }
    
    
        durationFormat += (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
    
    }
    return durationFormat;
}
export let showErrorMessage = (messageError: string) => {
    let toastParent = (document.getElementById("toastParent"));
    toastParent?.classList.remove("hideToastMessage")
    toastParent?.classList.add("showToastMessage")
    setTimeout(() => {
        
      let toastContent = (document.getElementById("toastContentMessage") as any);
      toastContent.innerHTML = messageError;
      let errorMessageToastBtn = (document.getElementById("errorMessageToastBtn") as any)
      errorMessageToastBtn.click();

        // let toastContainer = (document.querySelector(".toast-container"));
        // toastContainer?.classList.toggle("showToast")

        // let toastContent = (document.getElementById("toast-content") as any);
        // messageError = messageError.toString().replace("Error:", "")
        // toastContent.innerHTML = messageError.split(";").join("<br>");
        // (window as any).toastList.forEach((toast : any) => toast.show()); 
    }, 200)
}