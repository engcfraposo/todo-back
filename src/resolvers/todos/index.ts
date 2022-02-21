import Todo from "../../models/Todo";
import {
    getOnAzureCache,
    setOnAzureCache
} from "../../cache";
export default {
    todo: async (_: any, { id }: {id:string}) => {
        if(!id) {
            throw new Error("No id provided");
        }
        const cached = await getOnAzureCache(id);
        if (cached) {
            return {...cached, id: cached._id};
        }
        const todo = await Todo.findById(id);
        if(!todo) {
            throw new Error("No todo found");
        }
        await setOnAzureCache(id, todo);
        return todo
    },
    todos: async () => {
        const cached = await getOnAzureCache("todos");
        if (cached) {
            const cachedTodos = cached.map( (cache: { _id: string; }) => { return {...cache, id: cache._id} });
            return cachedTodos;
        }
        const todos = await Todo.find();
        await setOnAzureCache("todos", todos);
        return todos
    },
    createTodo: async (_: any, {title}:{title:string}) => {
        const todo = await Todo.create({
            title,
            isCompleted: false,
        });
        return todo
    },
    removeTodo: async (_: any, {id}:{id:string}) => {
        const todo = await Todo.findByIdAndRemove(id);
        return todo
    },

    setTodoComplete: async (_: any, { id }: {id:string}) => {
        const oldTodo = await Todo.findById(id);
        const todo = await Todo.findByIdAndUpdate(id,
            {isCompleted: !oldTodo.isCompleted},
            {new: true},
        )
        return todo
    },
}