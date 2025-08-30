---
title: MongoDB Lando Plugin
description: Add a highly configurable MongoDB service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MongoDB

[MongoDB](https://www.mongodb.com/) is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: mongo:8.0
```

## Supported versions

*   [8.0](https://hub.docker.com/_/mongo/tags?name=8.0.)
*   [7.0](https://hub.docker.com/_/mongo/tags?name=7.0.)
*   [6.0](https://hub.docker.com/_/mongo/tags?name=6.0.)
*   [5.0](https://hub.docker.com/r/bitnamilegacy/mongodb/tags?name=5.0.)
*   [4.4](https://hub.docker.com/r/bitnamilegacy/mongodb/tags?name=4.4.)
*   **[4.2](https://hub.docker.com/r/bitnamilegacy/mongodb/tags?name=4.2.)**  **(default)**
*   [4.0](https://hub.docker.com/r/bitnamilegacy/mongodb/tags?name=4.0.)
*   [3.6](https://hub.docker.com/r/bitnamilegacy/mongodb/tags?name=3.7.)
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

## Legacy versions

You can still run these versions with Lando but for all intents and purposes they should be considered deprecated (e.g. YMMV and do not expect a ton of support if you have an issue).

*   [4.1](https://hub.docker.com/r/bitnamilegacy/mongodb)
*   [3.6](https://hub.docker.com/r/bitnamilegacy/mongodb)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service they are not *officially* supported so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: mongo:8.0.10
```

