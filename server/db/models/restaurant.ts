import { Model, DataTypes, Sequelize } from "sequelize";
export default (sequelize: Sequelize, DataTypes: typeof import("sequelize").DataTypes) => {
    class Restaurant extends Model {
      public id!: number;
      public name!: string;
      public contact!: string;
      public address!: string;
  
      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;
    }
  
    Restaurant.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        contact: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "restaurants",
        modelName: "Restaurant",
        timestamps: true,
      }
    );
  
    return Restaurant;
  };
  


