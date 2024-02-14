import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

import { InvalidToken } from "../entity/Token"; 
import AppDataSource from "../data-source";

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

const validationToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenRepository = AppDataSource.getRepository(InvalidToken);
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const invalidToken = await tokenRepository.findOne({ where: { token } })
        if (invalidToken) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) return res.status(401).json({ error: "Token inválido" });

            if (typeof decoded === 'string') {
                req.id = decoded;
            } else {
                req.id = decoded.id;
            }
            next();
        });
    } catch (error) {
        res.status(500).json({
            error: "Ocorreu algum erro no sistema, tente novamente mais tarde",
            details: error.message
        });
    }
};

export default validationToken;