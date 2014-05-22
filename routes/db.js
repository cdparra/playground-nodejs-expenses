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

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var operations = [
    {
        description: "Dinner at that fancy restaurant",
        account: 3,
        amount: "60",
        currency: "EUR",
        date: "2014-05-21",
        category: 0,
        receipt_picture: "receipt_1.jpg", 
        note: "Nice meal!", 
        collection: "Rome 2014", 
        type: "expense"
    },
    {
        description: "Train ticket to Padova",
        account: 2,
        amount: "23",
        currency: "EUR",
        date: "2014-05-21",
        category: 2,
        receipt_picture: "receipt_2.jpg", 
        note: "arrived to late, next time take 5.40 train",
        collection: "Persuasive Conference",
        type: "expense"
    },
    {
        description: "Monthly salary",
        account: 1,
        amount: "1000",
        currency: "EUR",
        date: "2014-05-01",
        category: 3,
        receipt_picture: "receipt_3.jpg", 
        note: "",
        collection: "",
        type: "income"
    }];
    
    var categories = [
        {
            name: "Food",
            type: "expense",
            id: 0
        },
        {
            name: "Groceries",
            type: "expense",
            id: 1
        },
        {
            name: "Transportation",
            type: "expense",
            id: 2
        },
        {
            name: "Salary",
            type: "income",
            id: 3
        },
        {
            name: "Health",
            type: "expense",
            id: 4
        },
        {
            name: "Clothing",
            type: "expense",
            id: 5
        },
        {
            name: "Housing",
            type: "income",
            id: 6
        },
        {
            name: "Entertainment",
            type: "expense",
            id: 7
        },
        {
            name: "Tourism",
            type: "expense",
            id: 8
        }
    ];
    
    var accounts = [
        {
            name: "Bank Account",
            balance: 1000,
            previous_balance:0,
            id: 1
        },
        {
            name: "Cash",
            balance: 477,
            previous_balance:500,
            id: 2
        },
        {
            name: "Pre-paid Credit Card",
            balance: 300,
            previous_balance:360,
            id: 3
        },
        {
            name: "Paypal",
            balance: 0,
            previous_balance:0,
            id: 4
        }
    ];
    
    var settings = {
        default_currency: "EUR", 
        default_account: 1
    };
 
    db.collection('operations', function(err, collection) {
        collection.insert(operations, {safe:true}, function(err, result) {});
    });
    
    
    db.collection('categories', function(err, collection) {
        collection.insert(categories, {safe:true}, function(err, result) {});
    });
    
    db.collection('accounts', function(err, collection) {
        collection.insert(accounts, {safe:true}, function(err, result) {});
    });
 
    db.collection('settings', function(err, collection) {
        collection.insert(settings, {safe:true}, function(err, result) {});
    });
};