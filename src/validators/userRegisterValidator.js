const {check} = require('express-validator');
const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../data/users.json");


/*Register*/
const validationsRegisterUser = [
    check('username')
        .isLength({ min: 4, max: 16 })
        .withMessage('El campo usuario debe contener entre 4 y 16 caracteres')
        .bail()
        .custom(async (value) => {
            const user = await db.User.findOne({ where: { username: value } });
            if (user) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            return true;
        }),
        
    check('email')
        .isEmail()
        .withMessage('Debe ser un email válido')
        .bail()
        .custom(async (value) => {
            const userMail = await db.User.findOne({ where: { email: value } });
            if (userMail) {
                throw new Error('El correo ya fue registrado');
            }
            return true;
        }),

    check('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('El campo contraseña debe contener al menos 8 caracteres: 1 minúscula, 1 mayúscula, 1 número, 1 símbolo')
        .bail(),
    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
];

module.exports = validationsRegisterUser