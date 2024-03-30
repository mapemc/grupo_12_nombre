const {check} = require('express-validator');
const db = require('../database/models');


const validationsLoginUser = [
    check('email')
        .isEmail()
        .withMessage('Ingresa tu email')
        .custom(async (value) => {
            const user = await db.User.findOne({ where: { email: value } });
            if (!user) {
                throw new Error('Email no registrado');
            }
            return true;
        }),

    check('password')
        .notEmpty()
        .withMessage('La contraseña es incorrecta')
];

module.exports = validationsLoginUser