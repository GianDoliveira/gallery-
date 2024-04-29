import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken"; // Importe o tipo JwtPayload
import { InvalidToken } from "../entity/Token";
import AppDataSource from "../data-source";

const deleteToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    jwt.verify(token, "secret", async (err, decode) => {
        if (err) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }

        const tokenRepository = AppDataSource.getRepository(InvalidToken);

        const existingToken = await tokenRepository.findOne({ where: { token } });
        if (!existingToken) {
            const invalidToken = tokenRepository.create({
                token
            });
            await tokenRepository.save(invalidToken);
        }

        if (typeof decode === "object" && "id" in decode && typeof decode.id === "string") {
            req.id = decode.id;
        } else {
            res.status(401).json({ error: "O id do token é inválido" });
            return;
        }

        next();
    });
};

export default deleteToken;
