var express = require("express");
var Rutina = require("../models/rutina");
var app = express();

app.get('/rutina/:rutina', (req, res, next) => {
    var busqueda = req.params.rutina;

    Rutina.find({ _id: busqueda }, 'grabacion')
        .exec(
            (err, busqueda) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando busqueda',
                        error: err
                    });
                }

                res.status(200).json({
                    busqueda
                });

            });
});

module.exports = app;