import { 
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

import { Photo } from "./Photos";
import { Album } from "./Album";

@Entity({ name: 'photos_in_albums' })
export class PhotosAlbum {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Photo, photo => photo.photoAlbum)
    @JoinColumn({ name: 'photos_id' })
    photosId: Photo

    @ManyToOne(() => Album, album => album.photoAlbum)
    @JoinColumn({ name: 'album_id' })
    albumId: Album
}