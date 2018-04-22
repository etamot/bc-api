var express = require("express");
var Rutina = require("../models/rutina");
var app = express();

app.get("/busquedaRutina/:busqueda", (req, res, next) => {
    var busqueda = req.params.busqueda;

    Rutina.find({ _id: busqueda }, (err, rutinas) => {
        res.status(200).json({
            ok: true,
            rutinas: rutinas
        });
    });
});

module.exports = app;