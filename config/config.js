module.exports.SEED = 'firma-rozi-123-456-789';



//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bailaConmigoDB';
} else {
    urlDB = 'mongodb+srv://bailaconmigo:1234@cluster0.oztqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;
