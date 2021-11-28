import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema({
    title: String,
    isComplete: Boolean,
})

export default mongoose.model("Todo", TodoSchema)