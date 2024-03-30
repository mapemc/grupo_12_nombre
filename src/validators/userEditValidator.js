const {check} = require('express-validator');
const path = require('path');

const isImageExtension = (value) => {
    if (!value) {
        return true;
    }
    const extension = value.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    return allowedExtensions.includes(extension);
};


const validationsEditProfile = [
    check('password')
        .notEmpty()
        .withMessage('La contraseña es incorrecta'),
    check('password')
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage('El campo contraseña debe contener al menos 6 caracteres: 1 minúscula, 1 mayúscula, 1 número, 1 símbolo')
        .bail(),
    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
];

module.exports = validationsEditProfile