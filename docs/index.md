---
title: MongoDB Lando Plugin
description: Add a highly configurable MongoDB service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MongoDB

[MongoDB](https://www.mongodb.com/) is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/core/v3/services/lando.html) top-level config in your [Landofile](https://docs.lando.dev/core/v3).

```yaml
services:
  myservice:
    type: mongo
```

## Supported versions

*   [7.0](https://hub.docker.com/_/mongo)
*   [6.0](https://hub.docker.com/_/mongo)
*   [5.0](https://hub.docker.com/r/bitnami/mongodb)
*   [4.4](https://hub.docker.com/r/bitnami/mongodb)
*   **[4.2](https://hub.docker.com/r/bitnami/mongodb)**  **(default)**
*   [4.0](https://hub.docker.com/r/bitnami/mongodb)
*   [3.6](https://hub.docker.com/r/bitnami/mongodb)
*   [custom](https://docs.lando.dev/core/v3/services/lando.html#overrides)

## Legacy versions

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [4.1](https://hub.docker.com/r/bitnami/mongodb)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service they are not *officially* supported so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: mongo:4.1.4
```

