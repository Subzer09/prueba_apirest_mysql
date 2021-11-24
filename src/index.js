const express = require('express');
const app = express();

//Configuracion del servidor
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());

//Rutas
app.use(require('./routes/empleados'));

app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
})