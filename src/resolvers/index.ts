import TodoResolvers from "./todos"

export default {
    Query:{
        todos: TodoResolvers.todos,
        todo: TodoResolvers.todo,
    },
    Mutation:{
        createTodo: TodoResolvers.createTodo,
        removeTodo: TodoResolvers.removeTodo,
        setTodoComplete: TodoResolvers.setTodoComplete,
    }
}