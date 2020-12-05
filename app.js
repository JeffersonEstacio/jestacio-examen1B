const argv = require("./config/config").argv;
const colors = require("colors");
const obtenerData = require("./controlador/datos").obtenerData;
const guardarData = require("./controlador/datos").crearArchivo;

const run = async() => {
    info = await obtenerData(argv.pais, argv.anio.toString(), argv.archivo);
    opciones();
    return info;
};
let info;

const opciones = () => {
    let comando = argv._[0];
    switch (comando) {
        case "mostrar":
            console.log("=====================================================".green);
            console.log(`Personas que usan internet (% de la poblacion)`.yellow);
            console.log(`Pais: ${argv.pais}`.green);
            console.log(`Año: ${argv.anio}`.green);
            console.log(`Valor: ${info.porcentaje} %`.red);
        case "guardar":
            guardarData(info, argv.pais, argv.anio)
                .then((mensaje) => console.log(colors.green(mensaje)))
                .catch((err) => console.log(colors.red(err)));
            break;
        default:
            console.log("El comando no existe");
            break;
    }
};

run()
    .then()
    .catch((err) => {
        console.log(err);
    });