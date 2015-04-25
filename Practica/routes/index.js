var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bases de datos 1' });
});

var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'practica4',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

router.post('/Crear_Bus', function(req, res) {
  connection.query('INSERT INTO BUS (NOMBRE,PRECIO_KM,CLASE_BUS) VALUES (?,?,?)', [req.body.Nombre, req.body.Km, req.body.Clase],
      function() {
        res.redirect('/');
      }
    );
});

router.post('/Actualizar_Bus', function(req, res) {
  connection.query('UPDATE BUS SET PRECIO_KM = ?,CLASE_BUS = ? WHERE NOMBRE = ?', [req.body.Km,req.body.Clase,req.body.Nombre],
      function() {
        res.redirect('/');
      }
    );
});

router.post('/Eliminar_Bus', function(req, res) {
  connection.query('DELETE FROM BUS WHERE NOMBRE = ?', [req.body.bus],
      function() {
        res.redirect('/');
      }
    );
});


module.exports = router;
