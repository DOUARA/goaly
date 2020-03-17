const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs");

// Reading credentials from the json file
const data = fs.readFileSync(`${process.cwd()}/config/google-smtp.json`);
const { clientId, clientSecret, refreshToken } = JSON.parse(data);

// OAuth2 object initial
const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: refreshToken
});

// Get a fresh access token
const accessToken = oauth2Client.getAccessToken();

// smtp configuration
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "jscbiss@gmail.com",
    clientId,
    clientSecret,
    refreshToken,
    accessToken
  }
});

module.exports = smtpTransport;
