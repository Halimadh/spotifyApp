import { Album } from "../interfaces/album";
import { Artist } from "../interfaces/artist";
import { Playlist } from "../interfaces/playlist";
import { Podcast } from "../interfaces/podcast";

export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
export const BASE_URL = "https://api.spotify.com/v1";

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
