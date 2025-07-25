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
      '8.0': 'mongo:8.0.9-noble',
      '7.0': 'mongo:7.0.2-jammy',
      '6.0': 'mongo:6.0.11-jammy',
      '5.0': 'bitnami/mongodb:5.0.3-debian-10-r8',
      '4.4': 'bitnami/mongodb:4.4.9-debian-10-r10',
      '4.2': 'bitnami/mongodb:4.2.6-debian-10-r33',
      '4.1': 'bitnami/mongodb:4.1.13-debian-9-r96',
      '4.0': 'bitnami/mongodb:4.0.13-debian-9-r45',
      '3.6': 'bitnami/mongodb:3.6.16-debian-9-r41',
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
        image: `bitnami/mongodb:${options.version}`,
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
