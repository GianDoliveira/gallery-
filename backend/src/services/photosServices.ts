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
  const photoRepository = AppDataSource.getRepository(Photo);

  try {
    upload.single('image')(req, res, async (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro durante o upload da imagem' });
      }

      const { title, description} = req.body;
      const imagem_url = req.file ? req.file.path : null;
      const user_id = req.id ? parseInt(req.id, 10) : null;

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
          user_id,
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

export default registerPhoto;
