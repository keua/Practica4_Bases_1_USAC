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

router.post('/Crear_Ruta', function(req, res) {
  connection.query('INSERT INTO RUTA (NOMBRE) VALUES (?)', [req.body.Ruta],
      function() {
        res.redirect('/');
      }
    );
});

router.post('/Crear_Parada', function(req, res) {
  connection.query('INSERT INTO PARADA (NOMBRE,LOCALIZACION) VALUES (?,?)', [req.body.Parada,req.body.Loca],
      function() {
        res.redirect('/');
      }
    );
});

router.post('/Asignar_Bus', function(req, res) {
var query = connection.query('SELECT BUS FROM BUS WHERE NOMBRE = ?', [req.body.Bus], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
            console.log(resultado[0].BUS);

             var query = connection.query('SELECT RUTA FROM RUTA WHERE NOMBRE = ?', [req.body.Ruta], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado1 = result;
         if(resultado1.length > 0){
            console.log(resultado1[0].RUTA);

              connection.query('INSERT INTO ASIGN_BUS (BUS,RUTA) VALUES (?,?)', [resultado[0].BUS,resultado1[0].RUTA],
              function() {
              res.redirect('/');
              }
              );

         }else{
            console.log('Registro no encontrado');
         }
      }
   } );

         }else{
            console.log('Registro no encontrado');
         }
      }
   }
);
});

router.post('/Asignar_Parada', function(req, res) {
var query = connection.query('SELECT PARADA FROM PARADA WHERE NOMBRE = ?', [req.body.Parada], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
            console.log(resultado[0].PARADA);

             var query = connection.query('SELECT RUTA FROM RUTA WHERE NOMBRE = ?', [req.body.Ruta], function(error, result){
      if(error){
         throw error;
      }else{
         var resultado1 = result;
         if(resultado1.length > 0){
            console.log(resultado1[0].RUTA);

              connection.query('INSERT INTO ASIGN_RUTA (RUTA,PARADA,ORDEN) VALUES (?,?,?)', [resultado[0].PARADA,resultado1[0].RUTA,req.body.Sec],
              function() {
              res.redirect('/');
              }
              );

         }else{
            console.log('Registro no encontrado');
         }
      }
   } );

         }else{
            console.log('Registro no encontrado');
         }
      }
   }
);
});


module.exports = router;

