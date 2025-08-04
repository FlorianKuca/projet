import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.client.js";

export class User extends Model {}

User.init(
    {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(["member", "admin"]),
        allowNull: false,
        defaultValue: "member"
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true,
    },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "user"
    }
);




