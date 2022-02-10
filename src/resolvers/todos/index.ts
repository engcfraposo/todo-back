const Todo = [{
    id:"some-id",
    title:"some text",
    isCompleted:false,
}]

export default {
    todo: (_: any, { id }: {id:string}) => {
        return Todo[1]
    },
    todos: async () => {
        return Todo
    },
    createTodo: async (_: any, {title}:{title:string}) => {
        return Todo[0]
    },
    removeTodo: async (_: any, {id}:{id:string}) => {
        return Todo[0]
    },

    setTodoComplete: async (_: any, { id }: {id:string}) => {
        return Todo[0]
    },
}