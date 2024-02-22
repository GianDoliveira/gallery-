import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";

import { User } from "./User";
import { PhotosAlbum } from "./PhotosAlbum";

@Entity({ name: 'photos' })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    imagem_url: string

    @ManyToOne(() => User, user => user.photo)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => PhotosAlbum, photoAlbum => photoAlbum.photosId)
    photoAlbum: PhotosAlbum[]
    photoId: Photo;
}