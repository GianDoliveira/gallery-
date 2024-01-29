import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";

import { User } from "./User";
import { PhotosAlbum } from "./PhotosAlbum";

@Entity({ name: 'album' })
export class Album {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.album)
    @JoinColumn({ name: 'user_id' })
    user_id: User

    @OneToMany(() => PhotosAlbum, photoAlbum => photoAlbum.album_id)
    photoAlbum: PhotosAlbum[]
}