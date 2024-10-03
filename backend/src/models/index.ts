import { dbConfig } from "../config/db.config";
import { Sequelize, OperatorsAliases } from "sequelize";
import { NoteModel } from "./note.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:               dbConfig.HOST,
    dialect:            dbConfig.dialect,
    operatorsAliases:   undefined,

    // NOTICE: Notes assign each property individually.
    pool:               dbConfig.pool
});

const db = { 
    sequelize:  sequelize,
    notes:      NoteModel.init(sequelize)
};

export { db };