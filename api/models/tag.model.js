import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize.client.js';

export class Tag extends Model {}

Tag.init(
    {
  name: {
    type: DataTypes.STRING(55),
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING(7), // Hexadecimal code #123456
    allowNull: false,
    defaultValue: '#FFFFFF',
  },
    },
    {
        sequelize,
        modelName: 'tag',
        timestamps: true,
        paranoid: true,
    }
);
