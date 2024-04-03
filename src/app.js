/////////REQUIRES////////////
const express = require("express");
const path = require("path");
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require ('express-session');
const userController = require("./controllers/userController");

/////////EXPRESS//////////
const app = express();
///////// LLAMAR CORS /////////
const cors = require('cors');
app.use(cors());


/////////////////MIDDLEWARES//////////////
app.use(express.urlencoded({ extended: false })); // Para tomar los datos del body
app.use(express.json()); // Para tomar los datos del body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(session({
    secret: 'huellasSecreto',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000, 
        httpOnly: true, 
        secure: false, 
        sameSite: 'strict'
    }
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


///////////TEMPLATE ENGINES//////////
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


/* rutas */
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
/*const contactRouter = require("./routes/contactRouter");*/
const servicesRouter = require("./routes/servicesRouter");
const cartRouter= require ("./routes/cartRouter");
const apiProductsRouter= require ("./routes/api/apiProductsRouter");
//const apiUsersRouter= require ("./routes/api/apiUsersRouter");

app.use(express.static("public"));


app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
/*app.use("/contact", contactRouter);*/
app.use("/services", servicesRouter);
app.use ("/cart", cartRouter);

/* APIs */
app.use("/api/products", apiProductsRouter);

const apiUsersRouter = require("./routes/api/apiUsersRouter.js");
app.use("/api/users", apiUsersRouter);


/* Not found */
app.use((req, res, next) => {res.status(404).render('notFound')})
// * Servidor *// 
app.listen(3456, () => {
    console.log('Servidor corriendo en http://localhost:3456');
})


