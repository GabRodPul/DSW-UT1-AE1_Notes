import { Dialect } from "sequelize";

const dbConfig = {
    HOST:       "localhost",
    USER:       "root",
    PASSWORD:   "root",
    DB:         "db_notes",
    dialect:    "mysql" as Dialect,
    pool:       {
        max: 5,
        min: 0,
        acquire: 30_000,
        idle: 10_000
    }
};

export { dbConfig };