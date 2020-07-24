const express = require('express');
const app = express();
const db = require('./models')
const exphbs = require('express-handlebars');
const session = require("express-session");

const PORT = process.env.PORT || 3000;
 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7200000
    }
}))

app.use( express.static('public'));

const authRoutes = require('./controllers/authController');
app.use("/auth", authRoutes);

const blogApiRoutes = require('./controllers/blogController');
app.use("/api/blogs", blogApiRoutes);

const frontEndRoutes = require('./controllers/frontendController');
app.use(frontEndRoutes);


db.sequelize.sync({force:false}).then(function(){
    app.listen(PORT);
})