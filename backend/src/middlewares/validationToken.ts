import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

import { InvalidToken } from "../entity/Token";
import AppDataSource from "../data-source";

declare global {
    namespace Express {
        interface Request {
            id?: string;
            user?: any;
        }
    }
}

const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenUserId = req.id ? parseInt(req.id, 10) : null;
        const requestUserId = parseInt(req.params.userId, 10); // Supondo que o ID do usuário esteja disponível nos parâmetros da solicitação

        if (tokenUserId !== requestUserId) {
            return res.status(401).json({ error: "Acesso não autorizado" });
        }

        // O ID do usuário no token corresponde ao ID na solicitação, continue com o processamento
        next();
    } catch (error) {
        res.status(500).json({
            error: "Ocorreu algum erro no sistema, tente novamente mais tarde",
            details: error.message
        });
    }
};

const validationToken = async (req: Request, res: Response, next: NextFunction) => {
    const tokenRepository = AppDataSource.getRepository(InvalidToken);
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const invalidToken = await tokenRepository.findOne({ where: { token } })
        if (!authHeader) {
            return res.status(401).json({ error: 'Token de autenticação ausente' });
        }
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
            validateUserId(req, res, next);
        });
    } catch (error) {
        res.status(500).json({
            error: "Ocorreu algum erro no sistema, tente novamente mais tarde",
            details: error.message
        });
    }
};

export default validationToken;