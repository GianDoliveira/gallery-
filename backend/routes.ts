import { Router } from 'express';

import registerUser from "./src/services/registerService";
import validationRegister from "./src/middlewares/validationRegister";
import loginUser from "./src/services/loginServices";
import validationLogin from "./src/middlewares/validationLogin";

import registerPhoto from './src/services/photosServices';

//valida o token do usuário logado quando for fazer um método HTTP
import validationToken from './src/middlewares/validationToken';
import tokenService from './src/services/tokenService';

const router = Router();

router.post("/register", validationRegister, registerUser);
router.post("/login", validationLogin, loginUser);
router.post("/photos", validationToken, registerPhoto);

router.post("/token", tokenService);

export default router;