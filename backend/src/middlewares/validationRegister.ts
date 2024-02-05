import AppDataSource from '../data-source';
import { User } from '../entity/User';
import { Request, Response, NextFunction } from 'express';

const validationRegister = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        res
            .status(400)
            .json({ message: "Já existe um usuário cadastrado com este email" });
        return;
    }

    if (password <= 6) {
        res
            .status(400)
            .json({ message: "Senha precisa ter mais que 6 caracteres" });
        return;
    }

    next();
}

export default validationRegister;

