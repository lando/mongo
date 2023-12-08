---
title: MongoDB Lando Plugin
description: Add a highly configurable MongoDB service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MongoDB

[MongoDB](https://www.mongodb.com/) is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

```yaml
services:
  myservice:
    type: mongo
```

## Supported versions

*   [5.0](https://hub.docker.com/r/bitnami/mongodb)
*   [4.4](https://hub.docker.com/r/bitnami/mongodb)
*   **[4.2](https://hub.docker.com/r/bitnami/mongodb)**  **(default)**
*   [4.0](https://hub.docker.com/r/bitnami/mongodb)
*   [3.6](https://hub.docker.com/r/bitnami/mongodb)
*   [custom](https://docs.lando.dev/config/services.html#advanced)

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

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/mongo" line to install a particular version eg
# npm install @lando/mongo@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:18-alpine sh -c \
  "npm init -y \
  && npm install @lando/mongo --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/mongo \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/mongo /plugins/@lando/mongo"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/mongo
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/mongo`. This command will also show you _where_ the plugin is being loaded from.
