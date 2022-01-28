# Notas para la correcta utilización de la app.
1. Instalar node modules ``` npm install ```.
2. Crear una base de datos en postgreSQL llamada ```alwaysmusic```.
3. Dentro de la base de datos ```alwaysmusic``` crear una tabla ```usuarios``` con la siguiente estructura:
```
    CREATE TABLE usuarios(
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(64) NOT NULL,
        rut VARCHAR(12) UNIQUE NOT NULL,
        curso VARCHAR(32) NOT NULL,
        nivel INT NOT NULL
    ); 
```
4. Asegúrate que en el constructor de la ```clase Queries``` en el archivo ```queries.js```, tenga la configuración correspondiente a la de tu base de datos.
```
    this.config = {
        user: 'postgres', // Add your database user here - Example: postgres.
        host: 'localhost', // Add your database host here - Example: localhost.
        database: 'alwaysmusic', // Add your own database here - Example: alwaysmusic.
        password: '0000', // Add your database password here - Example: 0000.
        port: 5432 // Add your database port here - Example: 5432.
    };
```
5. Después de toda la configuración, estás listo para abrir tu consola favorita y realizar el comando ```npm start``` o ```node index``` para comenzar a disfrutar de la aplicación, deberías ver la siguiente imagen de inicio: ![Welcome Screen](https://github.com/Franxcode/desafio-always-music/blob/master/assets/img/welcome_screen.PNG?raw=true)

<hr/>