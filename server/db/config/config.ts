
import  dotenv  from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config()
interface DBConfig {
  url: string;
  dialect: Dialect;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

interface Config {
  development: DBConfig;
  production: DBConfig;
}

const DATABASE_URL = process.env.DATABASE_URL|| "postgresql://restaurants_aof9_user:bBiA6cLBiQ1eW5ScPn556nlV6ZsZ1wVP@dpg-cvqckdpr0fns73en6bp0-a.oregon-postgres.render.com/restaurants_aof9?sslmode=require"

const config: Config = {
  development: {
    url: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;
