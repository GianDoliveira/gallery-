import { Router, Request, Response } from "express";
import AppDataSource from "../data-source";
import bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';

import { User } from "../entity/User";

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: 'E-mail já está em uso' });
    }

    const newUser = userRepository.create({ username, email });
    bcrypt.hash(password, 10, async (err: any, hashedPassword: any) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário' })
        }
        newUser.password = hashedPassword;

        try {
            await userRepository.save(newUser);
            const token = jwt.sign({ userId: newUser.id }, 'minha_senha')
            return res.status(201).json({ message: 'Usuário registrado com sucesso' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
    });
});

export default router;