var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puntuacionSchema = new Schema({
    ninio: { type: Schema.Types.ObjectId, ref: 'Ninio', required: [true, 'el niño es necesaria'] },
    rutina: { type: Schema.Types.ObjectId, ref: 'Rutina', required: [true, 'la rutina es necesaria'] },
    puntuacion: { type: String, required: [true, 'El puntaje es necesario'] },
}, { collection: 'puntuaciones' });

module.exports = mongoose.model('Puntuacion', puntuacionSchema);