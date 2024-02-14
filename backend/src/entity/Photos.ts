import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Trash } from "./Trash";
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
    user_id: User

    @OneToMany(() => Trash, trash => trash.photo_id)
    trash: Trash[]

    @OneToMany(() => PhotosAlbum, photoAlbum => photoAlbum.photos_id)
    photoAlbum: PhotosAlbum[]
}