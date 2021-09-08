import { Photo } from "./Photo";


export interface Member {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    lookingFor: string;
    gender: string;
    introduction: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
}



