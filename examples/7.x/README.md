Mongo Example
=============

This example exists primarily to test the following documentation:

* [Mongo Service](https://docs.devwithlando.io/tutorials/mongo.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 7.0.2 as the default 7 version
lando ssh -s defaults -c "mongod --version" | grep v7.0.2

# Should use the user specified patch version if given
lando ssh -s patch -c "mongod --version" | grep v7.0.1

# Should add a new collection
lando mongosh test --eval "printjson(db.createCollection('lando'))"

# Should persist data after a rebuild
lando rebuild -y
lando mongosh test --eval "printjson(db.getCollectionNames())" | grep lando
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
