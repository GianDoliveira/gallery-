import { Router } from 'express';

import registerUser from "./src/services/registerService";
import validationRegister from "./src/middlewares/validationRegister";
import loginUser from "./src/services/loginServices";
import validationLogin from "./src/middlewares/validationLogin";

const {
    getPhotos,
    registerPhoto,
    updatePhotos,
    deletePhotos
} = require("./src/services/photosServices");

const {
    registerAlbum,
    photoInAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbums
} = require("./src/services/albumServices")

import validationToken from './src/middlewares/validationToken';
import tokenService from './src/services/tokenService';
import deleteToken from './src/middlewares/deleteToken';

const router = Router();

router.post("/register", validationRegister, registerUser);
router.post("/login", validationLogin, loginUser)
router.delete("/logout", deleteToken, (req, res) => {
    res.status(200).json({ message: "logout com sucesso!" });
});

router.get("/photos", validationToken, getPhotos);
router.post("/photos", validationToken, registerPhoto);
router.put("/photos/update", validationToken, updatePhotos);
router.delete("/photos/delete/:id", validationToken, deletePhotos);

router.post("/addAlbum", validationToken, registerAlbum);
router.post("/addPhotosInAlbum", validationToken, photoInAlbum);
router.get("/albums", validationToken, getAlbums);
router.put("/albums/update", validationToken, updateAlbum);
router.delete("/albums/delete/:id", validationToken, deleteAlbums);

router.post("/token", tokenService);

export default router;