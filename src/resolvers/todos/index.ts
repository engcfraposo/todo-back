import Todo from "../../models/Todo"
import mongoose from "mongoose"

export default {
    todo: async (_: any, { id }: {id:string}) => {
        const todo = await Todo.findById(id)
        return todo
    },
    todos: async () => {
        const todos = await Todo.find()
        return todos
    },
    createTodo: async (_: any, {title}:{title:string}) => {
        const todo = await Todo.create({
            title,
            isComplete: false,
        })
        return todo
    },
    removeTodo: async (_: any, {id}:{id:string}) => {
        const todo = await Todo.findByIdAndRemove(id)
        return todo
    },

    setTodoComplete: async (_: any, { id }: {id:string}) => {
        const oldTodo = await Todo.findById(id)
        const todo = await Todo.findByIdAndUpdate(
            id,
            {isComplete:!oldTodo.isComplete},
            {new: true}
        )
        return todo
    },
}