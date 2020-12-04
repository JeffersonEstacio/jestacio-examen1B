const datos = require('./controlador/datos');

const argv = require('yargs').options({
    archivo: {
        alias: 'f',
        desc: 'Permite establecer el path del archivo CSV que contiene los datos a analizar',
        demand: true
    },
    pais: {
        default: true,
        alias: 'c',
        desc: 'Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3.',
    },
    anio: {
        default: true,
        alias: 'y',
        desc: 'Permite especificar el año para el cual se requiere las estadísticas.',
    }

}).argv;

let pais = argv.pais
let anio = argv.anio

datos.getDatos(pais, anio)
    .then(respuesta => {
        console.log(`El codigo equivale al pais ${pais} y el año es ${anio}`);
    }).catch(err => {
        console.log(err);
    });