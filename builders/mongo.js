'use strict';

// Modules
const _ = require('lodash');
const path = require('path');
const semver = require('semver');

// Builder
module.exports = {
  name: 'mongo',
  config: {
    version: '4.2',
    supported: ['8.0', '7.0', '6.0', '5.0', '4.4', '4.2', '4.1', '4.0', '3.6'],
    legacy: ['4.1'],
    pinPairs: {
      '8.0': 'mongo:8.0.13-noble',
      '7.0': 'mongo:7.0.23-jammy',
      '6.0': 'mongo:6.0.26-jammy',
      '5.0': 'bitnamilegacy/mongodb:5.0.24-debian-11-r20',
      '4.4': 'bitnamilegacy/mongodb:4.4.15',
      '4.2': 'bitnamilegacy/mongodb:4.2.21',
      '4.1': 'bitnamilegacy/mongodb:4.1.13-r96',
      '4.0': 'bitnamilegacy/mongodb:4.0.27',
      '3.6': 'bitnamilegacy/mongodb:3.7.9-r30',
    },
    patchesSupported: true,
    confSrc: path.resolve(__dirname, '..', 'config'),
    port: '27017',
    remoteFiles: {
      database: '/bitnami/mongodb/conf/lando.conf',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoMongoDb extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      const mongoOfficial = {
        image: `mongo:${options.version}`,
        command: 'docker-entrypoint.sh mongod',
        environment: {
          ALLOW_EMPTY_PASSWORD: 'yes',
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        volumes: [
          `${options.data}:/data/db`,
        ],
      };

      const mongoBitnami = {
        image: `bitnamilegacy/mongodb:${options.version}`,
        command: '/launch.sh',
        environment: {
          ALLOW_EMPTY_PASSWORD: 'yes',
          LANDO_NEEDS_EXEC: 'DOEEET',
          // MONGODB_EXTRA_FLAGS for things like coallation?
        },
        volumes: [
          `${options.confDest}/launch.sh:/launch.sh`,
          `${options.data}:/bitnami`,
        ],
      };

      // If options.version is greater than 5.0, use the official mongo image
      const mongoAbove5 = semver.valid(semver.coerce(options.version)) ?
        semver.gte(semver.coerce(options.version), '6.0.0')
        : options._app.log.error(`Invalid version ${options.version} for mongo service`);

      const mongo = mongoAbove5 ? mongoOfficial : mongoBitnami;
      if (!options.healthcheck) {
        options.healthcheck = mongoAbove5 ? ['mongosh', 'tests', '--eval', 'db.runCommand("ping").ok']
        : ['mongo', 'tests', '--eval', 'db.runCommand("ping").ok'];
      }
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, mongo)});
    };
  },
};
