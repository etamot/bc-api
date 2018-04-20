var express = require('express');
var Corporacion = require('../models/corporacion');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==========================
// OBTENER TODAS LAS CORPORACIONES
// ==========================

app.get('/', (req, res, next) => {

    Corporacion.find({})
        .populate('usuario', 'nombre email')
        .exec(
            (err, corporaciones) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando corporacion',
                        error: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    corporaciones: corporaciones
                });

            });

});

// ==========================
// ACTUALIZAR UNA CORPORACION
// ==========================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body


    Corporacion.findById(id, (err, corporacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar corporacion',
                error: err
            });
        }

        if (!corporacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La corporacion con el id' + id + 'no existe',
                error: { message: 'No existe una corporacion con ese ID' }
            });
        }
        corporacion.nombre = body.nombre;
        corporacion.usuario = req.usuario._id;

        corporacion.save((err, corporacionGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la corporacion',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                corporacion: corporacionGuardado
            });
        });
    });
})

// ==========================
// CREAR UNA NUEVA CORPORACION
// ==========================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var corporacion = new Corporacion({
        nombre: body.nombre,
        usuario: req.usuario._id,
        //img: body.img,
    });

    corporacion.save((err, corporacionGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la corporacion',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            corporaciones: corporacionGuardado,
        });
    });
});



// ==========================
// BORRAR UNA CORPORACION
// ==========================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Corporacion.findByIdAndRemove(id, (err, corporacionBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar una corporacion',
                error: err
            });
        }
        if (!corporacionBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe una corporacion con ese id',
                error: err
            });
        }
        res.status(200).json({
            ok: true,
            corporacion: corporacionBorrado
        });

    });
})

app.delete('/')

module.exports = app;