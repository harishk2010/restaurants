import { Sequelize, DataTypes } from 'sequelize';
import RestaurantModel from './restaurant'; 
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

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
const syncDatabase = async () => {
  try {
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

