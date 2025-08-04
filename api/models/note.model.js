import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.client.js";

export class Note extends Model {}

Note.init(
    {
            title: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: "note",
        timestamps: true,
        paranoid: true,
    }
);