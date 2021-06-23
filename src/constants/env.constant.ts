import dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
};
