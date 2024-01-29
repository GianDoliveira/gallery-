import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "./entity/User";
import { Photo } from "./entity/Photos";
import { Album } from "./entity/Album";
import { Trash } from "./entity/Trash";
import { PhotosAlbum } from "./entity/PhotosAlbum";

import app from "../app";

require('dotenv').config();

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME
const port = process.env.PORT

const AppDataSource = new DataSource({
    type: "mysql",
    host: dbHost,
    port: 3306,
    username: dbUser,
    password: dbPass,
    database: dbName,
    synchronize: true,
    logging: false,
    entities: [User, Photo, Album, Trash, PhotosAlbum],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao inicializar o Data Source:', err);
    });

export default AppDataSource;