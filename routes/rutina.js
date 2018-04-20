var express = require('express');
var Rutina = require('../models/rutina');
var app = express();

// ==========================
// OBTENER TODAS LAS RUTINAS
// ==========================

app.get('/', (req, res, next) => {

    Rutina.find({})
        .exec(
            (err, rutinas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando rutinas',
                        error: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    rutinas: rutinas
                });

            });

});


// ==========================
// CREAR UNA NUEVA RUTINA
// ==========================
app.post('/', (req, res) => {
    var body = req.body;
    var rutina = new Rutina({
        nombre: body.nombre,
        grabacion: body.grabacion
    });

    rutina.save((err, rutinaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la rutina',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            rutinas: rutinaGuardado,
        });
    });
});



// ==========================
// BORRAR UNA RUTINA
// ==========================

app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Rutina.findByIdAndRemove(id, (err, rutinaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar una rutina',
                error: err
            });
        }
        if (!rutinaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe una rutina con ese id',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            rutina: rutinaBorrado
        });

    });
})

app.delete('/')

module.exports = app;