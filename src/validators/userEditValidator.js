const {check} = require('express-validator');
const path = require('path');

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
        }),
    check('avatar')
    .custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Sube una imagen');
        } else {
            const fileExtension = path.extname(req.file.originalname).toLowerCase();
            const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Formatos de imagen permitidos: ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validationsEditProfile