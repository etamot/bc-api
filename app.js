// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


const port = process.env.PORT || 3000;


// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var ninioRoutes = require('./routes/ninio');
var rutinaRoutes = require('./routes/rutina');
var corporacionRoutes = require('./routes/corporacion');
var puntuacionRoutes = require('./routes/puntuacion');

//Inicializar variables
var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Conexion a la base de datos
mongoose.connection.openUri(process.env.URLDB, (err, res) => {

    if (err) throw err;
    console.log('Base de datos: online');

});

//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/ninio', ninioRoutes);
app.use('/corporacion', corporacionRoutes);
app.use('/puntuacion', puntuacionRoutes);
app.use('/rutina', rutinaRoutes);
app.use('/', appRoutes);

//Escuchar peticiones
app.listen(port, () => {
    console.log(`Express server corriendo en el puerto ${ port }`);
});