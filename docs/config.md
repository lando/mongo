---
title: Configuration
description: Learn how to configure the Lando MongoDB service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/core/v3/services/lando.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/core/v3/services/lando.html#build-steps) and [overrides](https://docs.lando.dev/core/v3/services/lando.html#overrides) that are available to every service, are shown below:

```yaml
services:
  myservice:
    type: mongo:4.0
    portforward: false
    config:
      database: SEE BELOW
```

::: warning Be careful when switching database version!
You should be careful switching database `version` because the underlying database will not be compatible unless you follow these steps to upgrade it:

If you have a current project with 4.2 that you wish to upgrade to 5.0, you need to upgrade to 4.4 first (change the version, run lando rebuild) and do the tiny step described here:
https://www.mongodb.com/docs/v5.3/release-notes/5.0-upgrade-standalone/

> Run the setFeatureCompatibilityVersion command against the admin database:
> db.adminCommand( { setFeatureCompatibilityVersion: "4.4" } )

Before you update the mongodb version to 5.0 and repeat the above step.

You can also use mongodump to create a backup of your database, delete the mongo instance, recreate it on a new version and use mongorestore to populate the database again.

**Ignoring this warning can prevent your database from starting**
:::


## Port forwarding

`portforward` will allow you to access this service externally by assigning a port directly on your host's `localhost`. Note that ` portforward` can be set to either `true` or a specific `port` but we *highly recommend* you set it to `true` unless you have pretty good knowledge of how port assignment works or you have a **very** compelling reason for needing a locked down port.

`portforward: true` will prevent inevitable port collisions and provide greater reliability and stability across Lando apps. That said, one downside of `portforward: true` is that Docker will assign a different port every time you restart your application. You can read more about accessing services externally [over here](https://docs.lando.dev/guides/external-access.html).

`tl;dr`

**Recommended**

```yaml
services:
  myservice:
    type: mongo
    portforward: true
```

**Not recommended**

```yaml
services:
  myservice:
    type: mongo
    portforward: 27018
```

## Using a custom MongoDB config file

You may need to override our [default mongo config](https://github.com/lando/mongo/tree/main/builders) with your own [custom mongo config](https://www.mongodb.com/docs/manual/reference/configuration-options/).

If you do this, you must use a file that exists inside your application and express it relative to your project root as shown below:

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory in the below example but you can call it whatever you want such as `.lando`.

```bash
./
|-- config
   |-- custom.conf
|-- .lando.yml
```

**Landofile's mongo config**

```yaml
services:
  myservice:
    type: mongo
    config:
      database: config/custom.conf
```

## Getting information

You can get connection and credential information about your mongo instance by running [`lando info`](https://docs.lando.dev/cli/info.html). It may also be worth checking out our [accessing services externally guide](https://docs.lando.dev/guides/external-access.html).
