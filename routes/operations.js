// use mongodb as a database
var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true, safe:false});
db = new Db('expensesdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'expensesdb' database");
        db.collection('operations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'operations' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving operation: ' + id);
    db.collection('operations', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
            if(err!=null){
                console.error(err);
            }
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('operations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addOperation = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('operations', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateOperation = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('operations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}
 
exports.deleteOperation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('operations', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var operations = [
    {
        description: "Dinner at that fancy restaurant",
        account: "Bank Account",
        amount: "60",
        currency: "EUR",
        date: "2014-05-21",
        category: "Food",
        receipt_picture: "receipt_1.jpg", 
        note: "Nice meal!", 
        collection: "Rome 2014", 
        type: "expense"
    },
    {
        description: "Train ticket to Padova",
        account: "Cash",
        amount: "23",
        currency: "EUR",
        date: "2014-05-21",
        category: "Transportation",
        receipt_picture: "receipt_2.jpg", 
        note: "arrived to late, next time take 5.40 train",
        collection: "Persuasive Conference",
        type: "expense"
    },
    {
        description: "Monthly salary",
        account: "Bank Account",
        amount: "1000",
        currency: "EUR",
        date: "2014-05-01",
        category: "Salary",
        receipt_picture: "receipt_3.jpg", 
        note: "",
        collection: "",
        type: "income"
    }];
    
//    var categories = [];
//    var accounts = [];
//    var settings = [];
 
    db.collection('operations', function(err, collection) {
        collection.insert(operations, {safe:true}, function(err, result) {});
    });
 
};