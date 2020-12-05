let mostrar = {
    archivo: {
        demand: true,
        alias: 'f',
        desc: 'Permite establecer el path del archivo CSV que contiene los datos a analizar'
    },
    pais: {
        default: 'ECU',
        alias: 'c',
        desc: 'Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3. El valor por defecto es “ECU”.'
    },
    anio: {
        default: 1960,
        alias: 'y',
        desc: 'Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 1960.'
    }
}

let guardar = {
    archivo: {
        demand: true,
        alias: 'f',
        desc: 'Permite establecer el path del archivo CSV que contiene los datos a analizar'
    },
    pais: {
        default: 'ECU',
        alias: 'c',
        desc: 'Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3. El valor por defecto es “ECU”.'
    },
    anio: {
        default: 1960,
        alias: 'y',
        desc: 'Permite especificar el año para el cual se requiere las estadísticas. Por defecto, 1960.'
    },
}

const argv = require('yargs')
    .command('mostrar', 'Este comando imprime en pantalla el resultado de la búsqueda',
        mostrar)
    .command('guardar', 'ste comando genera un archivo de texto con el resultado de la búsqueda. Recibe los mismos parámetros que el comando anterior.',
        guardar)
    .help()
    .argv;

module.exports = {
    argv
}