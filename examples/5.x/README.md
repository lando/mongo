# Mongo 5 Example

This example exists primarily to test the following documentation:

* [Mongo Service](https://docs.lando.dev/plugins/mongo)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should use 5.0.24 as the default 5 version
lando exec defaults -- mongo --version | grep v5.0.24

# Should use the user specified patch version if given
lando exec patch -- mongo --version | grep v5.0.5

# Should add a new collection
lando mongo test --eval "printjson(db.createCollection('lando'))"

# Should persist data after a rebuild
lando rebuild -y
lando mongo test --eval "printjson(db.getCollectionNames())" | grep lando
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
