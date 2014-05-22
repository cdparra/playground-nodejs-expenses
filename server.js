var express = require('express'),
    db = require('./routes/db'),
    operations = require('./routes/operations'),
    categories = require('./routes/categories'),
    accounts = require('./routes/accounts');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/operations', operations.findAll);
app.get('/operations/:id', operations.findById);
app.post('/operations', operations.addOperation);
app.put('/operations/:id', operations.updateOperation);
app.delete('/operations/:id', operations.deleteOperation);

app.get('/categories', categories.findAll);
app.get('/categories/:id', categories.findById);
app.post('/categories', categories.addOperation);
app.put('/categories/:id', categories.updateOperation);
app.delete('/categories/:id', categories.deleteOperation);

app.get('/accounts', accounts.findAll);
app.get('/accounts/:id', accounts.findById);
app.post('/accounts', accounts.addOperation);
app.put('/accounts/:id', accounts.updateOperation);
app.delete('/accounts/:id', accounts.deleteOperation);

 
app.listen(3000);
console.log('Listening on port 3000...');

/* Testing the API with CURL

Get all wines:
curl -i -X GET http://localhost:3000/wines

Get wine with _id value of 5069b47aa892630aae000007 (use a value that exists in your database):
curl -i -X GET http://localhost:3000/wines/5069b47aa892630aae000007

Delete wine with _id value of 5069b47aa892630aae000007:
curl -i -X DELETE http://localhost:3000/wines/5069b47aa892630aae000007

Add a new wine:
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New Wine", "year": "2009"}' http://localhost:3000/wines

Modify wine with _id value of 5069b47aa892630aae000007:
curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "New Wine", "year": "2010"}' http://localhost:3000/wines/5069b47aa892630aae000007

*/