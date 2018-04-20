var express = require('express');
var Puntuacion = require('../models/puntuacion');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==============================
// OBTENER TODAS LAS PUNTUACIONES
// ==============================

app.get('/', (req, res, next) => {

    Puntuacion.find({})
        .populate('ninio')
        .populate('rutina')
        .exec(
            (err, puntuaciones) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando puntuaciones',
                        error: err
                    });
                }

                res.status(200).json({
                    puntuaciones
                });

            });

});


// ==========================
// CREAR UNA NUEVA PUNTUACION
// ==========================
app.post('/', (req, res) => {
    var body = req.body;
    var puntuacion = new Puntuacion({
        ninio: body.ninio,
        rutina: body.rutina,
        puntuacion: body.puntuacion
            //img: body.img,
    });

    puntuacion.save((err, puntuacionGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la puntuacion',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            puntuacion: puntuacionGuardada,
        });
    });
});



// ==========================
// BORRAR UNA PUNTUACION
// ==========================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Ninio.findByIdAndRemove(id, (err, niñoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar un niño',
                error: err
            });
        }
        if (!niñoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un niño con ese id',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            niño: niñoBorrado
        });

    });
})

app.delete('/')

module.exports = app;