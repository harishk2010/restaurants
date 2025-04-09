import { Sequelize, DataTypes } from 'sequelize';
import RestaurantModel from './restaurant'; // Import the Restaurant model
const configData = require('../config/config');

// Determine the environment
const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

// Connect using the database URL
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  logging: false, // Disable logging for cleaner console output
});

// Load the Restaurant model
const models = [RestaurantModel];
models.forEach((model) => {
  const initializedModel = model(sequelize, DataTypes);
  db[initializedModel.name] = initializedModel;
});

// Setup associations if available
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
const syncDatabase = async () => {
  try {
    // This will create tables that don't exist yet
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};
syncDatabase()
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;




// import { Sequelize, DataTypes } from 'sequelize';
// import path from 'path';
// import RestaurantModel from './restaurant'; // Import the Restaurant model
// const configData = require('../config/config');

// // Determine the environment
// const env = process.env.NODE_ENV || 'development';
// const config = configData[env];

// const db: { [key: string]: any; sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

// let sequelize: Sequelize;
// if (config.use_env_variable) {
//     sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
// } else {
//     sequelize = new Sequelize(
//         config.database,
//         config.username,
//         config.password,
//         config
//     );
// }

// // Load the Restaurant model
// const models = [RestaurantModel];
// models.forEach((model) => {
//     const initializedModel = model(sequelize, DataTypes);
//     db[initializedModel.name] = initializedModel;
// });

// // Setup associations if available
// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;
