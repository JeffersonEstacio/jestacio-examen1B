const fs = require("fs");
const neatCsv = require("neat-csv");
const paises = require("../datos/paises").paises;

let datosAnio = [];
let informacion = [];
let crearArchivo = (datos, pais, anio) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(
                "resultados")) {
            fs.mkdirSync(
                "resultados");
        }
        archivo = `Datos registrados \n`;
        archivo += `Pais: ${pais}\n`;
        archivo += `Valor: ${datos.porcentaje}`
        fs.writeFile(`resultados/${datos.codigo} - ${anio}.txt`, archivo, (err) => {
            if (err)
                reject(err);
            else
                resolve('=====================================================');
        });
    });
};

const validarNum = (numero) => {
    if (!Number(numero)) {
        throw Error(`${numero}: El valor no es un valor nuimerico`);
    }
};

const cargarDatos = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async(err, data) => {
            if (err) {
                reject("Error no se pudo leer el archivo");
            } else {
                resolve((informacion = await neatCsv(data)));
            }
        });
    });
};

const vecAnio = async(anio) => {
    let anios = Object.values(informacion[3]);
    anio = anios.indexOf(anio);
    for (let index = 4; index < informacion.length; index++) {
        datosAnio.push([
            informacion[index][anio],
            informacion[index][0],
            informacion[index][1],
            informacion[index][2]
        ]);
    }
    return true;
};

const comprobar = (codigoPais) => {
    return new Promise((resolve, reject) => {
        datosAnio.forEach((element) => {
            if (element[2] == codigoPais) {
                resolve(true);
                return;
            }
        });
        reject(`El codigo de país: "${codigoPais}" no fue encontrado`);
    });
};

const limpiar = () => {
    vec = [];
    datosAnio.forEach((element) => {
        if (paises.includes(element[2])) {
            vec.push(element);
        }
    });
    datosAnio = vec;
};

const comprobarAnio = (anio) => {
    let anios = Object.values(informacion[3]);
    return new Promise((resolve, reject) => {
        anios.forEach((element) => {
            if (element == anio) {
                resolve(true);
                return;
            }
        });
        reject(`El año ${anio} no es valido`);
    });
};

const vectorPais = (codPais) => {
    dato = [];
    datosAnio.forEach((element) => {
        if (element[2] == codPais) {
            dato = element;
            return;
        }
    });
    return dato;
};

const obtenerData = async(codPais, anio, path) => {
    await cargarDatos(path);
    validarNum(anio);
    vecAnio(anio);
    limpiar();
    await comprobarAnio(anio);
    await comprobar(codPais);
    let mediaPais = vectorPais(codPais)
    return {
        porcentaje: mediaPais[0],
        codigo: mediaPais[2]
    };
};

module.exports = {
    crearArchivo,
    obtenerData
};