const { Router } = require('express');
import registerUser from "./src/services/registerService";
import validationRegister from "./src/middlewares/validationRegister";
import loginUser from "./src/services/loginServices";
import validationLogin from "./src/middlewares/validationLogin";

const router = Router();

router.post("/register", validationRegister, registerUser);
router.post("/login", validationLogin, loginUser);

export default router;