import { Request, Response } from "express";
import AppDataSource from "../data-source";
import { DeepPartial } from "typeorm";

import { Album } from "../entity/Album";
import { PhotosAlbum } from "../entity/PhotosAlbum";
import { Photo } from "../entity/Photos";

const registerAlbum = async (req: Request, res: Response) => {
    const albumRepository = AppDataSource.getRepository(Album);
    try {
        const { title, description } = req.body;
        const user = req.id ? parseInt(req.id, 10) : null;

        if (!title || !description) {
            return res.status(404).json({ error: 'Os campos são obrigatórios' })
        }

        const createPhoto = albumRepository.create({
            title,
            description,
            user
        } as DeepPartial<Album>);
        await albumRepository.save(createPhoto);

        res.status(201).json({ message: "Albúm criado!" });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            err: "Ocorreu um erro!"
        });
    }
};

const getAlbums = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const albumRepository = AppDataSource.getRepository(Album);
        const userAlbum = await albumRepository.find({
            where: {
                user: { id: userId },
            } as any
        });

        res.status(200).json(userAlbum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os albúms do usuário' });
    }
};

const updateAlbum = async (req: Request, res: Response) => {
    try {
        const albumRepository = AppDataSource.getRepository(Album);
        const { id, title, description, userId } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID do albúm é obrigatório' });
        }
        const existingAlbum = await albumRepository.findOne({ where: { id: id } });
        if (!existingAlbum) {
            return res.status(404).json({ error: 'Foto não encontrada' });
        }

        existingAlbum.title = title || existingAlbum.title;
        existingAlbum.description = description || existingAlbum.description;
        existingAlbum.user = userId || existingAlbum.user

        await albumRepository.save(existingAlbum);

        res.status(200).json({ message: 'Albúm atualizada com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocorreu um erro durante a atualização do albúm' });
    }
}

const deleteAlbums = async (req: Request, res: Response) => {
    try {
        const albumRepository = AppDataSource.getRepository(Album);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID do albúm é obrigatório para a exclusão' });
        }

        const existingAlbum = await albumRepository.findOne({ where: { id: Number(id) } });

        if (!existingAlbum) {
            return res.status(404).json({ error: 'Albúm não encontrado' });
        }

        await albumRepository.remove(existingAlbum);

        res.status(200).json({ message: 'Albúm excluído com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocorreu um erro durante a exclusão do albúm' });
    }
}

const photoInAlbum = async (req: Request, res: Response) => {
    const photoRepository = AppDataSource.getRepository(Photo);
    const albumRepository = AppDataSource.getRepository(Album);
    const photosAlbumRepository = AppDataSource.getRepository(PhotosAlbum);

    try {
        const { albumId, photoId } = req.body;
        const album = await albumRepository.findOne({ where: { id: albumId } });
        if (!album) {
            return res.status(404).json({ error: 'Álbum não encontrado' });
        }

        const photos = await photoRepository.findOne({ where: { id: photoId } });
        if (!photos) {
            return res.status(404).json({ error: 'Foto não encontrada' });
        }

        const photosAlbums = photosAlbumRepository.create({
            photosId: photos,
            albumId: album
        })
        await photosAlbumRepository.save(photosAlbums);
        res.status(201).json({ message: "Foto adiciada ao albúm!" });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            err: "Ocorreu um erro ao tentar adicionar o albúm!"
        });
    }
}

module.exports = {
    registerAlbum,
    photoInAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbums
};