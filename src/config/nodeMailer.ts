import "dotenv/config";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secure: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "andres_v10@live.com",
    pass: "asanta-principal",
  },
});

// import { google } from "googleapis";
// import SMTPTransport from "nodemailer/lib/smtp-transport";

// const { OAuth2 } = google.auth;

/* const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
); */

/* export const getTokenAndTransport =
async (): Promise<nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null> => {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      tls: {
        rejectUnauthorized: false,
      }
    } as any);
    console.log('ENTREEE')
    const tokeen = await oauth2Client.getAccessToken();
    if(!tokeen.token) return null;
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: tokeen.token,
        // pass: "nvobqkmmcjhwelln" // "asanta-subetuarchivo"
      },
    } );
    return transport;
  }; */


/* console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD);

{
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: token,
    },
  }
  */

/* export const transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});  */
