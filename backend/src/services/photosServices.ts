import { Request, Response } from "express";
import AppDataSource from "../data-source";
import * as cloudinary from 'cloudinary';
import upload from "../multerConfig";

import { Photo } from "../entity/Photos";
import { DeepPartial } from "typeorm";

require('dotenv').config();

const clName = process.env.CL_NAME
const clKey = process.env.CL_KEY
const clSecret = process.env.CL_SECRET

cloudinary.v2.config({
  cloud_name: clName,
  api_key: clKey,
  api_secret: clSecret
})

const registerPhoto = async (req: Request, res: Response) => {
  try {
    const photoRepository = AppDataSource.getRepository(Photo);
    upload.single('image')(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro durante o upload da imagem' });
      }
      const { title, description } = req.body;
      const imagem_url = req.file ? req.file.path : null;
      const user = req.id ? parseInt(req.id, 10) : null;

      if (!title || !imagem_url || !description) {
        return res.status(400).json({ error: 'Os campos são obrigatórios' });
      }

      try {
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(imagem_url, {
          resource_type: 'image',
        });

        const createPhoto = photoRepository.create({
          imagem_url: cloudinaryResponse.secure_url,
          title,
          description,
          user,
        } as DeepPartial<Photo>);

        await photoRepository.save(createPhoto);
        res.status(201).json({ message: 'Foto adicionada!' });
      } catch (cloudinaryError) {
        console.error(cloudinaryError);
        return res.status(500).json({ error: 'Erro upload da imagem para Cloudinary' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      err: 'Ocorreu um erro ao adicionar a foto!',
    });
  }
};

const getPhotos = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const photoRepository = AppDataSource.getRepository(Photo);
    const userPhotos = await photoRepository.find({
      where: {
        user: { id: userId },
      } as any
    });

    res.status(200).json(userPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as fotos do usuário' });
  }
};

const updatePhotos = async (req: Request, res: Response) => {
  try {
    const photoRepository = AppDataSource.getRepository(Photo);
    const { id, title, description, userId } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID da foto é obrigatório' });
    }
    const existingPhoto = await photoRepository.findOne({ where: { id: id } });
    if (!existingPhoto) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }

    existingPhoto.title = title || existingPhoto.title;
    existingPhoto.description = description || existingPhoto.description;
    existingPhoto.user = userId || existingPhoto.user

    await photoRepository.save(existingPhoto);

    res.status(200).json({ message: 'Foto atualizada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro durante a atualização da foto' });
  }
}

const deletePhotos = async (req: Request, res: Response) => {
  try {
    const photoRepository = AppDataSource.getRepository(Photo);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID da foto é obrigatório para a exclusão' });
    }

    const existingPhoto = await photoRepository.findOne({ where: { id: Number(id) } });

    if (!existingPhoto) {
      return res.status(404).json({ error: 'Foto não encontrada' });
    }

    await photoRepository.remove(existingPhoto);

    res.status(200).json({ message: 'Foto excluída com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro durante a exclusão da foto' });
  }
}

export default getPhotos;

module.exports = {
  registerPhoto,
  getPhotos,
  updatePhotos,
  deletePhotos
};
