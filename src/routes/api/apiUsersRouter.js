const express = require("express");
const router = express.Router();

/*autenticador */
const adminMiddleware = require('../../middlewares/adminMiddleware.js');
const apiUsersController = require("../../controllers/api/apiUsersController.js");


router.get("/", /* adminMiddleware, */ (req, res) => {
    apiUsersController.getUsers(req, res);
});
/*
Página 1: /api/users?limit=10&offset=0 limit muestra los usuarios por pagina, este es el inicio, hay hasta 10
Página 2: /api/users?limit=10&offset=10 si existe este qrystring, entonces hay +10
Página 3: /api/users?limit=10&offset=20 pagina 2 + 1...
 */

router.get("/:username", /* adminMiddleware, */ (req, res) => {
    apiUsersController.getUserByUsername(req, res);
});

module.exports = router;
