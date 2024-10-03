import { Sequelize, DataType, DataTypes } from "sequelize";

type NoteData = { title: string, content: string }

const NoteModel = { init: (sequelize: Sequelize) => 
    sequelize.define("note", {
        title:   { type: DataTypes.STRING(128) },
        content: { type: DataTypes.STRING      },
    }) };

export { NoteData, NoteModel };