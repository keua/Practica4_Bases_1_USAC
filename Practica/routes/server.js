var express = require('express');
var mysql = require('mysql');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});

var client = mysql.createClient({
  host: 'localhost',
  user: 'root',
  password: 'root',
});

client.database = 'practica4';



app.post('/Crear_Bus', function(req, res) {
  client.query('UPDATE universidades SET nombre = ?, ciudad = ? WHERE id = ?', [req.body.nombre, req.body.ciudad, req.body.id],
      function() {
        res.redirect('/');
      }
    );
});
