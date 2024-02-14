import { Request, Response } from "express";
import AppDataSource from "../data-source";

import { Album } from "../entity/Album";

const registerAlbum = async (req: Request, res: Response) => {
    const albumRepository = AppDataSource.getRepository(Album);
    try {
        const { title, description } = req.body;

        const createPhoto = albumRepository.create({
            title,
            description
        });
        await albumRepository.save(createPhoto);

        res.status(201).json({ message: "Foto adicionada!" });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            err: "Ocorreu um erro!"
        });
    }
};

export default registerAlbum;