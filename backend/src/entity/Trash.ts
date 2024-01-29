import { 
    Entity, 
    PrimaryGeneratedColumn, 
    JoinColumn,
    ManyToOne
} from "typeorm";

import { User } from "./User";
import { Photo } from "./Photos";

@Entity({ name: 'trash' })
export class Trash {

    @PrimaryGeneratedColumn()
    id: number

    //FOREIGN KEY photo_id
    @ManyToOne(() => Photo, photo => photo.trash)
    @JoinColumn({ name: 'photo_id' })
    photo_id: Photo

    @ManyToOne(() => User, user => user.trash)
    @JoinColumn({ name: 'user_id' })
    user_id: User
}