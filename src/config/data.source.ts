import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as dotenv from "dotenv";

dotenv.config();

const Config: DataSourceOptions = {
  type: "mysql",
  host: "127.0.0.1", // Cambia esta línea al host de tu base de datos MySQL
  port: 3306, // Cambia al puerto correcto de tu base de datos MySQL
  username: "root", // Cambia al nombre de usuario de tu base de datos MySQL
  password: "43279670", // Cambia a tu contraseña de base de datos MySQL
  database: "proyecto_programacion", // Cambia al nombre de tu base de datos MySQL
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource: DataSource = new DataSource(Config);