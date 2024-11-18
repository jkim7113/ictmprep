import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, 'Question is required!']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required!']
    },
    answers: {
        type: [String],
        required: [true, 'Answers are required!'],
    },
    year: {
        type: Number,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: false,
    },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;