const path = require("path");
const { Op } = require("sequelize");
const db = require('../database/models'); // Importa la configuración de la base de datos
const Product = require('../database/models/Product')(db.sequelize, db.Sequelize); // Importa el modelo y pasa sequelize y dataTypes



const mainController ={
    index: async (req, res) => {
        const loggedInUser = req.session.user; 
        let { erro } = req.query;
            if (!erro) {
            erro = '';
        }
        const ultimoTerminoBusqueda = erro.split(' ').pop();
    
        const products_index = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${erro}%` } },
                    { category: { [Op.like]: `%${erro}%` } },
                    { description: { [Op.like]: `%${erro}%` } }
                ]
            },
            limit: 5
        });
        res.render("index.ejs", { user: loggedInUser , products_index, ultimoTerminoBusqueda });
    },
    
    enviarMensaje: (nombre, email, mensaje) =>{
        return new Promise((resolve, reject) => {
            // Aquí puedes integrar la lógica para enviar el mensaje, como enviar un correo electrónico o guardar en una base de datos

            // Por ahora, solo imprimiremos el mensaje en la consola
            console.log('Mensaje recibido de:', nombre);
            console.log('Email:', email);
            console.log('Mensaje:', mensaje);

            // Simular una operación exitosa
            resolve({ nombre, email, mensaje });
        })
    },
    contact: (req, res) =>{
        res.render("contact.ejs");
    },
    search: async (req, res) => {
        try {
            const { query } = req.query;
            const products = await Product.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { category: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                }
            });
    
            if (products.length === 0) {
                res.render("notFound.ejs", { query });
            } else {
                res.render("searchResults.ejs", { products, query });
            }
        } catch (error) {
            console.error('Error al buscar productos:', error);
            res.status(500).send('Error al buscar productos');
        }
    }
};

module.exports = mainController;