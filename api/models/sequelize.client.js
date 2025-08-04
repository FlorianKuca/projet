import 'dotenv/config';
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    }
});

export default sequelize;

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
