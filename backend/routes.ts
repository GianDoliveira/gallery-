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

router.get("/:userId/photos", validationToken, getPhotos);
router.post("/:userId/photos", validationToken, registerPhoto);
router.put("/:userId/photos/update", validationToken, updatePhotos);
router.delete("/:userId/photos/delete/:id", validationToken, deletePhotos);

router.post("/:userId/addAlbum", validationToken, registerAlbum);
router.post("/:userId/addPhotosInAlbum", validationToken, photoInAlbum);
router.get("/:userId/albums", validationToken, getAlbums);
router.put("/:userId/albums/update", validationToken, updateAlbum);
router.delete("/:userId/albums/delete/:id", validationToken, deleteAlbums);

router.post("/token", tokenService);

export default router;