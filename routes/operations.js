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
    var operation = req.body;
    console.log('Adding operation: ' + JSON.stringify(operation));
    db.collection('operations', function(err, collection) {
        collection.insert(operation, {safe:true}, function(err, result) {
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
    var operation = req.body;
    console.log('Updating operation: ' + id);
    console.log(JSON.stringify(operation));
    db.collection('operations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, operation, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating operation: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(operation);
            }
        });
    });
}
 
exports.deleteOperation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting operation: ' + id);
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