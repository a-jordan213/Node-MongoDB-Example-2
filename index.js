const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/'; //custom form, port#
const dbname = 'nucampsite'; //database name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { //later on, it wont be nec (topology) no details
 
    assert.strictEqual(err, null); //check err is not null, checking against (null)

    console.log('Connected correctly to server'); //the mongodb server

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => { //gets call at the end. theres difference btwn calling (running) a fn and defining (will do) a fn. 
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, //mod will find doc that matches to update the single doc
                    { description: "Updated Test Description" }, 'campsites', //then what we want to update to 
                    result => { //calback fn
                        console.log('Updated Document Count:', result.result.nModified); //to get count

                        dboper.findDocuments(db, 'campsites', docs => { //then find the update
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, //will act as filter
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});