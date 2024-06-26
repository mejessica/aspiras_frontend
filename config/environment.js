'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'projeto-aspiras-app',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      host: 'http://localhost:8000',
      namespace: 'api',
    },

    'ember-simple-auth': {
      authenticationRoute: 'login',
      routeAfterAuthentication: 'authenticated',
      routeIfAlreadyAuthenticated: 'authenticated',
    },

    'ember-simple-auth-token': {
      identificationField: 'email',
      passwordField: 'password',
      tokenPropertyName: 'token',
      authorizationPrefix: 'Bearer ',
      authorizationHeaderName: 'Authorization',
      refreshAccessTokens: true,
      tokenExpirationInvalidateSession: false,
      refreshLeeway: 40,
    },

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV['ember-simple-auth-token'] = {
      refreshAccessTokens: true,
      tokenExpirationInvalidateSession: false,
    };
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }
  ENV['ember-simple-auth-token'] = {
    refreshAccessTokens: true,
    tokenExpirationInvalidateSession: false,
    refreshLeeway: 10, // refresh 5 minutes (300 seconds) before expiration
  };

  ENV['ember-simple-auth-token'].crossOriginWhiteList = [ENV.APP.host];
  ENV['ember-simple-auth-token'].serverTokenEndpoint =
    ENV.APP.host + '/' + ENV.APP.namespace + '/auth';

  return ENV;
};
