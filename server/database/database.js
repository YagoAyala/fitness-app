const admin = require("firebase-admin");
const { Datastore } = require('@google-cloud/datastore');
const datastoreCredential = require("./datastore-credentials.json")

require("dotenv").config();

const {
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN,
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert(datastoreCredential),
});

const datastore = new Datastore({
  projectId: PROJECT_ID,
  credentials: datastoreCredential
});

module.exports = { datastore, admin };