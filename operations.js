const assert = require('assert').strict;
 //four methods to insert, find, remove & udpate; wow.
exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection); //coll short for colelction
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => { //list all the docs won't need the 2nd 
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => { //access from mongodb, empty param list to findall docs, into an array then callback fn
        assert.strictEqual(err, null); //checking error, if none then callback
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => { 
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => { //this meth will take 2 args, which doc to delete
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => { //4 param, 1)info doc, 2)test object which is $set:update to write over exis 3) don't need 4)callback fn err or results with assert. 
        assert.strictEqual(err, null);
        callback(result);
    });
};