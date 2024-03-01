import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    OneToMany,
} from "typeorm"

import { Album } from "./Album"
import { Photo } from "./Photos"
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

    @OneToMany(() => Photo, photo => photo.user)
    photo: Photo[]

    @OneToMany(() => Album, album => album.user)
    album: Album[]

    @OneToMany(() => InvalidToken, invalidToken => invalidToken.user)
    invalidToken: InvalidToken[];
}
