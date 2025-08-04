import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.client.js";

export class Site extends Model {}

Site.init(
    {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},
    {
        sequelize,
        modelName: "site",
        timestamps: true,
        paranoid: true,
    }
);
