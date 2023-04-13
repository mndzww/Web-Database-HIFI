const dotenv = require('dotenv');

dotenv.config();

module.exports = {
   serviceName : process.env.SERVICE_NAME,
   urlDb : process.env.DATABASE_URL,
   secret: process.env.SECRET,
}
