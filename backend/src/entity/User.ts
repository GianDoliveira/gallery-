import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
} from "typeorm"

import { Album } from "./Album"
import { Photo } from "./Photos"
import { Trash } from "./Trash"
import { InvalidToken } from "./Token"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Photo, photo => photo.user_id)
    photo: Photo[]

    @OneToMany(() => Album, album => album.user_id)
    album: Album[]

    @OneToMany(() => Trash, trash => trash.user_id)
    trash: Trash[]

    @OneToMany(() => InvalidToken, invalidToken => invalidToken.user_id)
    invalidToken: InvalidToken[];
}
