var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rutinaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es nescesario'] },
    grabacion: [{}],
    tiempo: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rutina', rutinaSchema);