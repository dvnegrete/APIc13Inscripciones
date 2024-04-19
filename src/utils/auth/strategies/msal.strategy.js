const { clientIdMs, clientSecretMs, tenantID } = require("../../../../config");
const boom = require("@hapi/boom");

var MicrosoftStrategy = require('passport-microsoft').Strategy;
    passport.use(new MicrosoftStrategy({
        // Standard OAuth2 options
        clientID: clientIdMs,
        clientSecret: clientSecretMs,
        callbackURL: "http://localhost:3000/auth/microsoft/callback",
        scope: ['user.read'],

        // Microsoft specific options

        // [Optional] The tenant for the application. Defaults to 'common'. 
        // Used to construct the authorizationURL and tokenURL
        //tenant: 'common',
        tenant: tenantID,

        // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
        //authorizationURL: 'https://login.microsoftonline.com/e031f1fa-232a-466c-ba77-923a786de156/oauth2/v2.0/authorize',
        authorizationURL: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,

        // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
        tokenURL: 'https://login.microsoftonline.com/e031f1fa-232a-466c-ba77-923a786de156/oauth2/v2.0/token',
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ userId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

module.exports = MicrosoftStrategy;