import jwt = require('jsonwebtoken');
import { User } from '../entity/User';
import { Request, Response } from "express";
import AppDataSource from "../data-source";
import bcrypt = require('bcrypt');

const jwtSecret = "secret"

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const loginUser = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    try {
        const { email, password } = req.body;
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser === null) {
            res.status(400).json({ message: 'E-mail inválido!' });
            return;
        }
        const match = await bcrypt.compare(password, existingUser.password);
        if(!match) {
            res.status(400).json({ error: "Senha incorreta" });
            return;
        }

        res.status(200).json({
            message: "Autenticado com sucesso!",
            token: generateToken(existingUser.id),
          });
    } catch (error) {
        res
          .status(500)
          .json({ error: "Ocorreu algum erro, tente novamente mais tarde" });
      }
};

export default loginUser;