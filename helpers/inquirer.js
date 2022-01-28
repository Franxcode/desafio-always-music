require('colors');

const inquirer = require('inquirer');

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: `Bienvenido ${process.env.USERNAME}, qué desea hacer?`,
		choices: [
			{
				value: "1",
				name: `${"1.".brightGreen} Agregar nuevo estudiante`,
			},
			{
				value: "2",
				name: `${"2.".brightGreen} Consultar los estudiantes registrados`,
			},
			{
				value: "3",
				name: `${"3.".brightGreen} Consultar estudiantes por rut`,
			},
			{
				value: "4",
				name: `${"4.".brightGreen} Actualizar la información de un estudiante`,
			},
			{
				value: "5",
				name: `${"5.".brightGreen} Eliminar estudiante`,
			},
			{
				value: "0",
				name: `${"0.".brightGreen} Salir`,
			},
		],
	},
];

const inquirerMenu = async () => {
		console.clear();
		console.log("======================================================".brightGreen);
		console.log("  		Seleccione una opción".white);
		console.log("======================================================\n".brightGreen);
	
		const { opcion } = await inquirer.prompt(preguntas);
	
		return opcion;

};

const leerInputRegistroEstudiante = async () => {
	const question = [
		{
			type: "input",
			name: "nombre",
			message: 'Ingresa el nombre del estudiante a registrar',
			default: 'Francisco',
			validate(value) {
				if (value.length === 0 || !isNaN(value)) {
					return "Por favor ingrese un valor, y asegúrese que este valor no sea numérico.".bgRed.brightWhite;
				}
				return true;
			},
		},
		{
			type: "input",
			name: "rut",
			message: 'Ingresa el rut del estudiante a registrar',
			default: '11.111.111-1',
			validate(value) {
				const regex = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/;
				const res = regex.test(value);
				if (value.length < 0 || res === false) {
					return 'Por favor ingrese un rut válido en el formato XX.XXX.XXX-X y vuelva a intentarlo.'.bgRed.brightWhite; 
				}
				return true;
			},
		},
		{
			type: "input",
			name: "curso",
			message: 'Ingresa el curso al que pertenece el estudiante',
			default: 'Guitarra',
			validate(value) {
				if (value.length === 0 || !isNaN(value)) {
					return "Por favor ingrese un valor, y asegúrese que este valor no sea numérico.".bgRed.brightWhite;
				}
				return true;
			},
		},
		{
			type: "input",
			name: "nivel",
			message: 'Ingresa el nivel al que pertenece el estudiante',
			default: 5,
			validate(value) {
				if (value.length === 0 || isNaN(value)) {
					return "Por favor ingrese un valor numerico.".bgRed.brightWhite;
				}
				return true;
			},
		}
	];

	const { nombre, rut, curso, nivel } = await inquirer.prompt(question);
	return {nombre, rut, curso, nivel};
};

const leerInputConsultaEstudianteRut = async () => {
	const question = [
		{
			type: "input",
			name: "rut",
			message: 'Ingresa el rut del estudiante a consultar',
			default: '11.111.111-1',
			validate(value) {
				const regex = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/;
				const res = regex.test(value);
				if (value.length === 0 || res === false) {
					return 'Por favor ingrese un rut válido en el formato XX.XXX.XXX-X y vuelva a intentarlo.'.bgRed.brightWhite;
				}
				return true;
			},
		}
	];
	const { rut } = await inquirer.prompt(question);
	return rut;
};

const leerInputActualizarInformacionEstudiante = async (estudiantes = []) => {

	const question = [
		{
			type: "input",
			name: "rut",
			message: 'Ingresa rut del estudiante a actualizar',
			default: '11.111.111-1',
			validate(value) {
				const regex = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/;
				const res = regex.test(value);
				if (value.length === 0 || res === false) {
					return 'Por favor ingrese un rut válido en el formato XX.XXX.XXX-X y vuelva a intentarlo.'.bgRed.brightWhite;
				}
				return true;
			},
		}
	];

		const data = await inquirer.prompt(question);

		let resp;
		let arrRut = [];
	
		estudiantes.forEach(e=>{
			let test = `${data.rut}`;
			arrRut.push(e.rut);
			resp = arrRut.includes(test);
			return resp;
		});
	
		if (resp === false) {
			console.log(`No existe alumno con el rut ${data.rut}, verifique la información y vuelva a intentarlo.`.bgRed.brightWhite);
			return;
		}
			let nombreActual = '';
			let rutActual = '';
			let cursoActual = '';
			let nivelActual = 0;
			let estudianteID = '';
	
			estudiantes.find( estudiante => {
					
			if(estudiante.rut === data.rut){
				estudianteID = estudiante.id;
				nombreActual = estudiante.nombre;
				rutActual = estudiante.rut;
				cursoActual = estudiante.curso;
				nivelActual = estudiante.nivel;
				}
			});
	
			const updateQuestions = [
				{
					type: "input",
					name: "nuevoNombre",
					message: 'Ingresa el nuevo nombre del estudiante a registrar',
					default: `${nombreActual}`,
					validate(value) {
						if (value.length === 0) {
							return "Por favor ingrese un valor";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "nuevoRut",
					message: 'Ingresa el nuevo rut del estudiante a registrar',
					default: `${rutActual}`,
					validate(value) {
					const regex = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/;
					const res = regex.test(value);
					if (value.length === 0 || res === false) {
						return 'Por favor ingrese un rut válido en el formato XX.XXX.XXX-X y vuelva a intentarlo.'.bgRed.brightWhite;
					}
					return true;
					},
				},
				{
					type: "input",
					name: "nuevoCurso",
					message: 'Ingresa el nuevo curso del estudiante a registrar',
					default: `${cursoActual}`,
					validate(value) {
						if (value.length === 0) {
							return "Por favor ingrese un valor";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "nuevoNivel",
					message: 'Ingresa el nuevo nivel del estudiante a registrar',
					default: `${nivelActual}`,
					validate(value) {
						if (value.length === 0) {
							return "Por favor ingrese un valor";
						}
						return true;
					},
				}
			];
	
			const estudianteTemporal = await inquirer.prompt(updateQuestions);
				estudianteTemporal.nombreActual = nombreActual;
				estudianteTemporal.rutActual = rutActual;
				estudianteTemporal.cursoActual = cursoActual;
				estudianteTemporal.nivelActual = nivelActual;
				estudianteTemporal.estudianteID = estudianteID;
			return estudianteTemporal;
};

const leerInputEliminarInformacionEstudiante = async (estudiantes = []) => {

	const question = [
		{
			type: "input",
			name: "rut",
			message: 'Ingresa rut del estudiante a eliminar',
			default: '11.111.111-1',
			validate(value) {
				const regex = /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/;
				const res = regex.test(value);
				if (value.length === 0 || res === false) {
					return 'Por favor ingrese un rut válido en el formato XX.XXX.XXX-X y vuelva a intentarlo.'.bgRed.brightWhite;
				}
				return true;
			},
		}
	];

	const data = await inquirer.prompt(question);

	let resp;
	let arrRut = [];

	estudiantes.forEach(e=>{
		let test = `${data.rut}`;
		arrRut.push(e.rut);
		resp = arrRut.includes(test);
		return resp;
	});

		if (resp === false) {
			console.log(`No existe alumno con el rut ${data.rut}, verifique la información y vuelva a intentarlo.`.bgRed.brightWhite);
		}
		let estudianteInfo = {};

			estudiantes.map(estudiante => {
				if (data.rut === estudiante.rut) {
					estudianteInfo = {
						id: estudiante.id,
						nombre: estudiante.nombre,
						rut: estudiante.rut,
						curso: estudiante.curso,
						nivel: estudiante.nivel
					};
					return estudiante;
				};
			});
		return estudianteInfo;
};

const confirmar = async (message) => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];
	const { ok } = await inquirer.prompt(question);
	return ok;
};
module.exports = {
	inquirerMenu,
	leerInputRegistroEstudiante,
	leerInputConsultaEstudianteRut,
	leerInputActualizarInformacionEstudiante,
	leerInputEliminarInformacionEstudiante,
	confirmar
};