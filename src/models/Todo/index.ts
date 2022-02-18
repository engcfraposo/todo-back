import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: String,
    isCompleted: Boolean,
})

export default mongoose.model("Todo", TodoSchema);