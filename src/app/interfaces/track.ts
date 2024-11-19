export interface Track {
    id : number,
    imageCover : string,
    title: string,
    artist: string,
    album: string,
    date: string,
    isLiked?: boolean,
    duration?: string,
    linkUrl: string,
    previewUrl: string,
}
