exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving category: ' + id);
    db.collection('categories', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
            if(err!=null){
                console.error(err);
            }
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('categories', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addOperation = function(req, res) {
    var category = req.body;
    console.log('Adding category: ' + JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.insert(category, {safe:true}, function(err, result) {
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
    var category = req.body;
    console.log('Updating category: ' + id);
    console.log(JSON.stringify(category));
    db.collection('categories', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, category, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating category: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(category);
            }
        });
    });
}
 
exports.deleteOperation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting category: ' + id);
    db.collection('categories', function(err, collection) {
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