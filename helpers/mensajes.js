require("colors");
const figlet = require('figlet');

const mostrarBienvenida = async() => {
	console.clear();
	figlet('Escuela de Música          Always Music', {
		horizontalLayout: "fitted",
		width: 100,
		whitespaceBreak: true,
	}, (err, data) => {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(`${data}`.brightGreen);
	});	
};

const mostrarSalida = async() => {
	console.clear();
	figlet(`Gracias por preferirnos ${process.env.USERNAME}, vuelva pronto!`, {
		horizontalLayout: "fitted",
		width: 100,
		whitespaceBreak: true,
	}, (err, data) => {
		if (err) {
			console.log('Something went wrong...');
			console.dir(err);
			return;
		}
		console.log(`${data}`.brightGreen);
	});	
};

const pausa = () => {
	return new Promise((resolve) => {
		const readline = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		readline.question(`\nPresiona ${"ENTER".green} para continuar\n`, (opt) => {
			readline.close();
			resolve();
		});
	});
};

module.exports = {
	mostrarBienvenida,
	mostrarSalida,
	pausa
};
