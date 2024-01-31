import { Router, Request, Response } from "express";
import AppDataSource from "../data-source";
import bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken';

import { User } from "../entity/User";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

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

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    bcrypt.compare(password, user.password, (err: any, result: any) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, 'minha_senha');

        return res.status(200).json({ token });
    });
})

export default router;