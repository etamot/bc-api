module.exports.SEED = 'firma-rozi-123-456-789';



//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//base de datos
let urlDB;


urlDB = 'mongodb://bc-user:guirova18@ds151809.mlab.com:51809/bailaconmigodb'


process.env.URLDB = urlDB;