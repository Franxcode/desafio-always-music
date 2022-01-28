require("colors");

const { inquirerMenu,
	 	leerInputRegistroEstudiante,
	 	leerInputConsultaEstudianteRut, 
		leerInputActualizarInformacionEstudiante, 
		leerInputEliminarInformacionEstudiante,
		confirmar} = require("./helpers/inquirer");

const { mostrarBienvenida, mostrarSalida, pausa } = require("./helpers/mensajes");
const Queries = require("./models/queries");

const main = async () => {
	
	let opt = "";
	const queries = new Queries();
	await mostrarBienvenida();
	await pausa();
	do {
		opt = await inquirerMenu();
		
		switch (opt) {
			case "1":
				const okRegistrarEstudiante = await confirmar('Esta seguro que desea agregar un nuevo estudiante?');
				if (okRegistrarEstudiante) {
					const inputRegistrarEstudiante = await leerInputRegistroEstudiante();
					const resRegistrarEstudiante = await queries.registrarEstudiante(inputRegistrarEstudiante);
					resRegistrarEstudiante ? console.log('\nEstudiante registrado con éxito.'.bgGreen.brightWhite) : null;
				};
				break;
			case "2":
				const okConsultarTodosLosEstudiantes = await confirmar('Esta seguro que desea consultar los datos de todos los estudiantes?');
				if (okConsultarTodosLosEstudiantes) {
					const resConsultaEstudiantes = await queries.obtenerTodosLosEstudiantes();
					resConsultaEstudiantes ? console.log('\nInformación de estudiantes consultada con éxito.'.bgGreen.brightWhite) : null;
				};
				break;
			case "3":
				const okConsultaEstudianteRut = await confirmar('Esta seguro que desea consultar los datos de un estudiante?');
				if (okConsultaEstudianteRut) {
					if (await queries.obtenerTodosLosEstudiantes() !== undefined) {
						const inputConsultaEstudianteRut = await leerInputConsultaEstudianteRut();
						if (inputConsultaEstudianteRut) {
							const resConsultarEstudianteRut = await queries.obtenerEstudiante(inputConsultaEstudianteRut);
							resConsultarEstudianteRut ? console.log('\nInformación de estudiante consultada con éxito.'.bgGreen.brightWhite) : null;
						};
					};
				};
				break;
			case "4":
				const okActualizarInformationEstudiante = await confirmar('Esta seguro que desea actualizar los datos de un estudiante?');
				if (okActualizarInformationEstudiante) {
					const estudiantesUpdate = await queries.obtenerTodosLosEstudiantes();
					if (estudiantesUpdate) {
						const inputActualizarInformacionEstudiante = await leerInputActualizarInformacionEstudiante(estudiantesUpdate);
						if (inputActualizarInformacionEstudiante !== undefined) {
							const resActualizar = await queries.actualizarEstudiante(inputActualizarInformacionEstudiante);
							resActualizar ? console.log('\nEstudiante Actualizado con éxito.'.bgGreen.brightWhite) : null;
						};
					};
				};
				break;
			case "5":
				const okEliminarEstudiante = await confirmar('Esta seguro que desea consultar los datos de un estudiante?');
				if (okEliminarEstudiante) {
					const estudiantesEliminar = await queries.obtenerTodosLosEstudiantes();
					if (estudiantesEliminar !== undefined) {
						const inputEliminarInformationEstudiante = await leerInputEliminarInformacionEstudiante(estudiantesEliminar);
						const objLength = Object.keys(inputEliminarInformationEstudiante).length;
						if (objLength > 0) {
						const ok = await confirmar('Esta seguro?');
						if (ok) {
						const respEliminar = await queries.eliminarEstudiante(inputEliminarInformationEstudiante);	
						respEliminar ? console.log('\nEstudiante Eliminado con éxito.'.bgGreen.brightWhite) : null;
							};
						};
					};
				};
				break;
		}
		await pausa();
	} while (opt !== "0");

	queries.serverDisconnect();
	mostrarSalida();

};
main();