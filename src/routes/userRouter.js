const express = require('express');
/* const app = express(); */
const fs = require('fs');
const path = require('path');
const router = express.Router();
const usersFilePath = path.join(__dirname, "../data/users.json");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const User = db.User;
const userController = require("../controllers/userController.js");
/*Validaciones y sesiones*/
const validationsRegisterUser = require('../validators/userRegisterValidator.js');
const validationsLoginUser = require('../validators/userLoginValidator.js');
const validationsEditProfile = require('../validators/userEditValidator.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const guestMiddleware = require('../middlewares/guestMiddleware.js');


/*Agregado multer*/
const multer = require('multer');
const generateFileName = (user, originalname) => {
    const fileNameWithoutExtension = path.parse(originalname).name;
    const fileExt = path.extname(originalname);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    return `${fileNameWithoutExtension}_${timestamp}${fileExt}`;
};
const storage = multer.diskStorage(
    {destination: function(req, file, cb)
        {let folder = path.join(__dirname, '../../public/img/avatars');
        cb(null, folder);}, /*folder where saved*/
        filename: function(req, file, cb) {
            const userToEdit = req.userToEdit || {};
            const imageName = generateFileName(userToEdit, file.originalname);    
            cb(null, imageName);}, /*File name*/
        fileFilter: function(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!acceptedExtensions.includes(ext)) {
            return cb(new Error('Formato de imagen no válido. Extensiones permitidas: ' + acceptedExtensions.join(', ')));
        }
        cb(null, true);
    }
    });
const uploadFile = multer({storage}); /*Execution saved*/

/*NAVBAR
router.get('/navbar', userController.navbarViews);*/

/*REGISTER con validaciones*/
router.get("/register", userController.register);
router.post("/register", validationsRegisterUser, userController.processRegister);


/*LOGIN*/
router.get("/login", userController.login);
router.post("/login", validationsLoginUser, userController.processLogin);

/*II M.V.A. password reset*/
router.get("/resetting/request", userController.resetPassword)
router.get("/resetting/check-email", userController.resetPasswordEmail) /*check-email?username=mail@algo*/
/*FF M.V.A.*/

/*EDIT PROFILE*/
router.get("/editProfile/:username", authMiddleware, validationsEditProfile, async (req, res) => {
    try {
        if (!req.session || !req.session.user || !req.session.user.username) {
            return res.render('notFound');
        }

        const loggedInUsername = req.session.user.username;
        const requestedUsername = req.params.username;

        if (loggedInUsername !== requestedUsername) {
            return res.render('notFound');
        }

        const userToEdit = await User.findOne({ where: { username: loggedInUsername } });
        const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');

        const provinces = await response.json();

        res.render("editProfile", { user: userToEdit, provinces: provinces.provincias });

    }  catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error: " + error.message);
    }
});


router.post("/editProfile/:username", authMiddleware, validationsEditProfile, uploadFile.single('avatar'), userController.processEditProfile);
/*DELETE*/
router.delete("/editProfile/:username/delete", userController.delete);

/*LOGOUT*/
router.get('/index', userController.logout);




/*CONTACTO*/
router.get('/logout', userController.logout);

module.exports = router; 