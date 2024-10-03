import { Express, Router } from "express";
import { NoteController } from "../controllers/note.controller";

const NoteRoutes = {
    init: (app: Express) => {
        const router = Router();
        
        // Create a new Note
        router.post( "/", NoteController.create );

        // Retrive all Notes
        router.get( "/", NoteController.findAll )

        // Retrive a single Note with id
        router.get( "/:id", NoteController.findOne )

        // Update a Note with id
        router.put( "/:id", NoteController.update )
        
        // Update a Note with id
        router.delete( "/:id", NoteController.delete )
        

        // Finish setup
        app.use("/api/notes", router);
    }
}

export { NoteRoutes };