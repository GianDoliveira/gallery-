import { Request, Response } from "express";
import AppDataSource from "../data-source";
import bcrypt = require('bcrypt');

import { User } from "../entity/User";

const registerUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
        const { username, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword
        });

        await userRepository.save(newUser);

        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (err) {
        console.error(err)
        res.status(500).json({
            err: "Ocorreu um erro!"
        });
    }
};

export default registerUser;