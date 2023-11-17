import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  private static dataSource: DataSource | null = null;

  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnvironment(k: string): string | undefined {
    return process.env[k];
  }

  public getNumberEnv(k: string): number {
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]; 

    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }
    return "." + arrEnv.join(".");
  }

  get initConnect(): Promise<DataSource> {
    if (ConfigServer.dataSource) {
      // Si ya existe una conexión, devuélvela directamente.
      return Promise.resolve(ConfigServer.dataSource);
    }

    // Si no hay una conexión, inicializa una y guárdala para futuros usos.
    return AppDataSource.initialize().then((dataSource) => {
      ConfigServer.dataSource = dataSource;
      return dataSource;
    });
  }
}
