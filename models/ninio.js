var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ninioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    corporacion: {
        type: Schema.Types.ObjectId,
        ref: 'Corporacion',
        required: [true, 'El id coorporacion es un campo obligatorio']
    }
}, { collection: 'ninios' });

module.exports = mongoose.model('Ninio', ninioSchema);