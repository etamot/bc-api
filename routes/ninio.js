var express = require('express');
var Ninio = require('../models/ninio');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();

// ==========================
// OBTENER TODOS LOS NIÑOS
// ==========================

app.get('/', (req, res, next) => {

    Ninio.find({})
        .populate('usuario', 'nombre email')
        .populate('corporacion')
        .exec(
            (err, ninios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando niño',
                        error: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    ninios: ninios
                });

            });

});

// ==========================
// ACTUALIZAR UN NIÑO
// ==========================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body


    Ninio.findById(id, (err, ninio) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el niño',
                error: err
            });
        }

        if (!ninio) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La niño con el id' + id + 'no existe',
                error: { message: 'No existe un niño con ese ID' }
            });
        }
        ninio.nombre = body.nombre;
        ninio.usuario = req.usuario._id;
        ninio.hospital = body.hospital;

        ninio.save((err, ninioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el niño',
                    error: err
                });
            }
            res.status(200).json({
                ok: true,
                ninio: ninioGuardado
            });
        });
    });
})

// ==========================
// CREAR UN NUEVO NIÑO
// ==========================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var ninio = new Ninio({
        nombre: body.nombre,
        usuario: req.usuario._id,
        corporacion: body.corporacion
            //img: body.img,
    });

    ninio.save((err, ninioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el niño',
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            ninios: ninioGuardado,
        });
    });
});



// ==========================
// BORRAR UN NIÑO
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