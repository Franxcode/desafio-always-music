const { Console } = require('console');
const { Transform } = require('stream');

require('colors');
const { Client } = require('pg');

class Queries{

    constructor(){

        this.config = {
            user: 'postgres',
            host: 'localhost',
            database: 'alwaysmusic',
            password: '0000',
            port: 5432
        };

        this.client = new Client( this.config );
        this.client.connect();
    }

    registrarEstudiante = async(input) => {
        try {
            const res = await this.client.query(`INSERT INTO usuarios (nombre, rut, curso, nivel) VALUES ('${input.nombre.toLowerCase()}', '${input.rut}','${input.curso.toLowerCase()}', ${input.nivel}) RETURNING*`);
            console.log('\n======================================================'.brightGreen);
            console.log('  Estudiante agregado con la siguiente información:'.brightWhite);
            console.log('======================================================'.brightGreen);
            const nombreCapitalized = res.rows[0].nombre.charAt(0).toUpperCase() + res.rows[0].nombre.slice(1);
            const cursoCapitalized = res.rows[0].curso.charAt(0).toUpperCase() + res.rows[0].curso.slice(1);
            console.log('Nombre:'.brightGreen, nombreCapitalized);
            console.log('Rut   :'.brightGreen, res.rows[0].rut);
            console.log('Curso :'.brightGreen, cursoCapitalized);
            console.log('Nivel :'.brightGreen, res.rows[0].nivel);
            return res.rows;
        } catch (error) {
            console.log(`El alumno con rut ${input.rut}, ya existe en la base de datos, verifique la información y vuelva a intentarlo.`.bgRed.brightWhite);
        }
    };

    obtenerTodosLosEstudiantes = async() => {
        try {
            const res = await this.client.query('SELECT * FROM usuarios ORDER BY rut');
            if (res.rowCount > 0) {
                this.table(res.rows);
                return res.rows;
            }else{
                console.log('No hay registros en la base de datos, verifique la información y vuelva a intentarlo.'.bgRed.brightWhite);
                return;
            }
        } catch (error) {
            console.log('No hay registros en la base de datos, verifique la información y vuelva a intentarlo.'.bgRed.brightWhite);
        }
    };

    obtenerEstudiante = async(rut) => {
        try {
            const res = await this.client.query(`SELECT * FROM usuarios WHERE rut = '${rut}' ORDER BY rut`);
            if (res.rowCount > 0) {
            this.table(res.rows);
            return res.rows;
            }else{
                console.log(`El usuario con rut ${rut} no existe en la base de datos, verifique la información y vuelva a intentarlo.`.bgRed.brightWhite);
            }
        } catch (error) {
            console.log('No existe el alumno asociado al rut ingresado, verifique la información y vuelva a intentarlo.'.bgRed.brightWhite);
        }
    };

    actualizarEstudiante = async(estudiante) => {
        try {
            const res = await this.client.query(`UPDATE usuarios SET nombre = '${estudiante.nuevoNombre}', rut = '${estudiante.nuevoRut}', curso = '${estudiante.nuevoCurso}', nivel = ${estudiante.nuevoNivel} WHERE id = '${estudiante.estudianteID}' RETURNING*`);
            if (res.rowCount > 0) {
                this.table(res.rows);
                return res.rows;
            }else{
                console.log(`El usuario con rut ${estudiante.rutActual} no existe en la base de datos, verifique la información y vuelva a intentarlo.`.bgRed.brightWhite);
            }
        } catch (error) {
            console.log('No existe el alumno asociado al rut ingresado, verifique la información y vuelva a intentarlo.'.bgRed.brightWhite);
        }
    };

    eliminarEstudiante = async(estudiante) => {
    try {
        const res = await this.client.query(`DELETE FROM usuarios WHERE id=${estudiante.id} RETURNING*`);
        this.table(res.rows);
        return res.rows;
    } catch (error) {
        console.log('No existe alumno con el rut ingresado, verifique la información y vuelva a intentarlo.'.bgRed.brightWhite);
    }
    };

    table = (input) => {
        const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
        const logger = new Console({ stdout: ts })
        logger.table(input)
        const table = (ts.read() || '').toString()
        let result = '';
        for (let row of table.split(/[\r\n]+/)) {
          let r = row.replace(/[^┬]*┬/, '┌');
          r = r.replace(/^├─*┼/, '├');
          r = r.replace(/│[^│]*/, '');
          r = r.replace(/^└─*┴/, '└');
          r = r.replace(/'/g, ' ');
          result += `${r}\n`;
        }
        console.log(result);
      };

      serverDisconnect = () => {
          this.client.end();
      }
};

module.exports = Queries;