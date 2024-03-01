import { NextFunction, Request, Response } from "express";

const validationLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Preencha o campo e-mail" });
    }

    if (!password) {
        return res.status(400).json({ message: "Preencha o campo senha" });
    }

    next();
};

export default validationLogin;