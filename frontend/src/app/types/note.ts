import { Validators } from "@angular/forms";

type Note = {
    id:      number,
    title:   string,
    content: string,
};

const noteValidator = {
    title:   ["", Validators.compose([Validators.required, Validators.maxLength(128)])],
    content: ["", Validators.compose([Validators.required])]
}

export {
    Note,
    noteValidator
}