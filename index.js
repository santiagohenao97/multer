const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

//Inicializamos express
const app = express();

//Establecemos el puerto
app.set('port', process.env.PORT || 4000);

//Multer Middleware
const storage = multer.diskStorage({
  //creamos la carpeta si no existe
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb)=>{
    cb(null, uuid() + path.extname(file.originalname));
  }
})
app.use(multer({storage}).single('image'))

//Routes
app.use(require('./routes/routes'))

//Iniciamos el servidor
app.listen(app.get('port'), ()=>{
  console.log(`Server on port ${app.get('port')}`);
})