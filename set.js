const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1A5QzhKdGs0MFFYNEpIVFVYTmFveHVEYU05eStaY2ZrUUZlMHJVbU9rRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVRKa2hUbU1vWVJEaVBZdk5NdEdPVTE5TTd4M0pla1RuK01MOVVJN3VEZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRVF0dHdxUG9iS3BiNGlPd1N3OW1zSFR5MjNHMWc0Rk53ZTZ1VGwreEZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3YkVBSEt6N3FWcGtPSCtWdHpaUlZ6Tjd5ZnUzczhnamU2Zk1MRHY0Q1NRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVPRzFEbC9WaVZ5QW5nS3VtVWxpS1dkd0pVZjkzTVJTN2F0Sm40d1JRV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRnYzJsQ25RUFJzL2NYQU5rM09jTER4NWlHV1FlYmFXUWFYMFNmK1I0RW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUNYclhIL2t4Z1dnTHQweVpJVUEvU0ZEN2puYWpjMENvVU9wN05IQkQzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFRrQ1UxY281OFlaVUV0bTlDSXVYK1NsekxhSDBUUXpWYUl5Y3oyeFgyST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CMStzRVhwYkpuOGdqY0lZV3JwSWxwbkwvYzZ3RWI1QlVKYkI0SmY4RWJ1RjVSc1E0WVcrVkthUE9OanNrOGpxUis3Qm1KYzlOZWYra2xsWkhsV0FBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJNMFJ1SjhoTGd4a3ArcUZ4T25CUStQTkd0N3lxOHpxdm5uRm51bXBFZDMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NDU4MDcwMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0MUEyNDk3NTQwRDIxMzE2QzExRjk5OEMzRTgzNkRCMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE5NjQ0MDE5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTQ1ODA3MDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTgxREFCRkYxQkU1ODMxQUE0QUVGOTNCMTdEM0VCNjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxOTY0NDAyMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWFl4WGJjaV9UTGVUYXZKOF9uTG5YdyIsInBob25lSWQiOiI0NGM4N2YyZC0wODE3LTQ5NWYtYWYzNy0zNzg4M2IzOGVlNmIiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVpTa3lUYW1CdHQ0RmZXRThHK2h6MzRJc3JZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5oUC9UN0M1ZkFGUXNDWHU2V0N1ZWphK09EZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJNRFBOVEJYQSIsIm1lIjp7ImlkIjoiMjU0Nzk0NTgwNzAwOjE3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCflqQg4oOdT0ZGSUNJQUwg4oOd4oiG8J2QmPCdkIDwnZCA4oOdw5EifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wyRXpQRUJFT0xlL3JNR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkVUZy9pSFVHRUk5aC9Yem1tbjdocXFxSCsxWHJDMUFBNmsydm12c1Eralk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InNWWXR0Z0dFamlWU2phQitUZFl2WDJDdGkvT2JTMVZOeGREd1h4b3RwYTYwM2pRU0thVStMVWluNmVjRkdJZHBZaVNwWkpudEVSVU5PL1NjeEppRkRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJocnRaNldzZmxZUGtlbnZId1JVdXhOS2RzYXJFMmpLSGg5WXF1VGJiTURRakRTekRHaVQ2emJkL2E0bTFzSEx5ZXVIZEx5K1RXZVJENXc1SURjU0xCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5NDU4MDcwMDoxN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSRTRQNGgxQmhDUFlmMTg1cHArNGFxcWgvdFY2d3RRQU9wTnI1cjdFUG8yIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5NjQ0MDE1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZkZiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254794580700",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BELTAH_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
