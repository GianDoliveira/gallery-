import jwt = require("jsonwebtoken");
import { InvalidToken } from "../entity/Token";
import { Request, Response } from "express";
import AppDataSource from "../data-source";

const tokenService = async (req: Request, res: Response) => {
    const tokenRepository = AppDataSource.getRepository(InvalidToken);
    try {
        const { token } = req.body;
        const tokenInvalid = await tokenRepository.findOne({ where: { token } })
        if (tokenInvalid) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        jwt.verify(token, "secret", (err: any, decoded: { id: string; }) => {
            if (err) return res.status(401).json({ error: "Token inválido" });

            req.id = decoded.id;
            return res.status(200).json({ message: "Token válidado" });
        });
    } catch (error) {
        res.status(500).json({
            error: "Ocorreu algum erro no sistema, tente novamente mais tarde!"
        });
    }
};

export default tokenService;