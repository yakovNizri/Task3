import path from "path";
import dotenv from "dotenv";

dotenv.config();

class BaseConfig {
    accessLogFile = __dirname + "\\..\\..\\logs\\accessLog.log";
    errorLogFile = path.resolve(__dirname, "..", "..", "logs", "errorLog.log");
}

class DevConfig extends BaseConfig {
    DB_FILE = __dirname + "\\..\\..\\sqlite.db";
    port = 3030;
}

class ProdConfig extends BaseConfig {
    DB_FILE = __dirname + "\\..\\..\\prod_sqlite.db";
    port = 3033;
}

export const appConfig = Number(global.process.env.IS_PROD) === 1 ? new ProdConfig() : new DevConfig();
