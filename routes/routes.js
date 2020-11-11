const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb)=>{
    cb(null, file.originalname);
  }
})

const cargaImagen = multer({
  storage, 
  limits: {fileSize: 1000000}
}).single('image');

router.post('/images/upload',(req, res)=>{
  cargaImagen(req, res, (err)=>{
    if(err){
      err.message ='Error al cargar el archivo';
      return res.send(err);
    }
    console.log(req.file);
    res.send('Imagen cargada satisfactoriamente, ¡QUE EMOCIÓN!')
  });
})

module.exports = router;