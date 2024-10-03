import { Identifier, Op, Sequelize } from "sequelize";
import express, {Request, Response} from 'express';
import { db } from "../models";
import { ResponseData, validate } from "../utils/validation";
import { NoteData } from "../models/note.model";
import * as rst from "../types/result"

type  Id  = { id: number };
const NoteDB    = db.notes;
const SeqOp     = Op;

const validationBase = <T>(data: T, f: (d: T) => boolean, code: number, msg: string):
    rst.Result<T, ResponseData> => 
    f(data)
    ?   rst.Ok(data as rst.Defined<T>)
    :   rst.Err({ code, msg });

const validateNote = (note: NoteData) => 
    validationBase(
        note,
        n => n.title   !== undefined
          && n.content !== undefined,
        400,
        "[VALIDATION ERROR] Must provide the following fields: { entry, content }"
    );

const validateId = (params: Id) => 
    validationBase(
        params,
        n => n.id !== undefined,
        400,
        "[VALIDATION ERROR] Must provide the following params: { id }"
    );

const NoteController = {
    create: async (req: Request, res: Response) => {
        const result = validate<NoteData>( req.body, [ validateNote ] )

        if (!result.ok) {
            res.status(result.error.code).send({ message: result.error.msg });
            return;
        }

        const note = {
            title:   result.value.title,
            content: result.value.content,
        };

        try {
            const data = await NoteDB.create(note);
            res.send(data);
        } catch (err: any) {
            res.status(500).send({ message: err.message ?? "Some error occurred while creating the note." })
        }
    },
    
    findAll: async (req: Request, res: Response) => {
        try {
            const data = await NoteDB.findAll();
            res.send(data);
        } catch (err: any) {
            res.status(500).send({ message: err.message ?? "Some error occurred while retrieving notes." })
        }
    },

    findManyByTitle: async (req: Request, res: Response) => {
        type  Title = { title: string };
        const validateTitle = (params: Title) => 
            validationBase(
                params, 
                (p) => p.title !== undefined, 
                400,
                "[VALIDATION ERROR] Must provide the following params: { title }"
            );

        const result = validate<Title>(req.params, [ validateTitle ]);

        if (!result.ok) {
            res.status(result.error.code).send({ message: result.error.msg });
            return;
        }

        try {
            const data = await NoteDB.findAll({
                where: {
                    title: db.sequelize.where(
                        db.sequelize.fn( "LOWER", db.sequelize.col("title")), "LIKE", "%" + result.value.title + "%"
                    )
                }
            })

            res.send(data)
        } catch (err: any) {
            res.status(500).send({ message: err.message ?? "Some error occurred while retrieving notes by title." })
        }
    },

    findOne: async (req: Request, res: Response) => {
        const result = validate<Id>(req.params, [ validateId ]);

        if (!result.ok) {
            res.status(result.error.code).send({ message: result.error.msg });
            return;
        }

        try {
            const data = await NoteDB.findByPk(result.value.id);
            res.send(data);
        } catch (err: any) {
            res.status(500).send({ message: err.message ?? "Some error occurred while retrieving note by id." })
        }
    },

    update: async (req: Request, res: Response) => {
        const resultId = validate<Id>(req.params, [ validateId ]);

        if (!resultId.ok) {
            res.status(resultId.error.code).send({ message: resultId.error.msg });
            return;
        }

        const resultNote = validate<NoteData>(req.body, [ validateNote ]);

        if (!resultNote.ok) {
            res.status(resultNote.error.code).send({ message: resultNote.error.msg });
            return;
        }

        const id = resultId.value.id;
        try {
            const data = await NoteDB.findOne({ where: { id } });
            if (!data) {
                throw new Error(`Entry with id ${id} not found`);
            }

            req.body.updatedAt = Date.now();
            await data.update(req.body);
            await data.save();
            res.send(data);
        } catch(err: any) {
            res.status(500).send({
                message: err.message ?? "Some error occurred while updating note with id " + id
              })
        }
    },

    delete: async (req: Request, res: Response) => {
        const result = validate<Id>(req.params, [ validateId ]);

        if (!result.ok) {
            res.status(result.error.code).send({ message: result.error.msg });
            return;
        }

        const id = result.value.id;
        try {
            const data = await NoteDB.destroy({ where: { id } });
            if (!data) {
                throw new Error(`Entry with id ${id} not found`);
            }

            res.status(204).send({ message: "Succesfully deleted!" });
        } catch (err: any) {
            res.status(500).send({ 
                message: err.message ?? "Some error occurred while updating note with id " + id
            })
        }
    },
}

export { NoteController };