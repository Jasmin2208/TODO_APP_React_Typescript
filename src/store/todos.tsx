import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date
}

export type TodoContext = {
    todos: Todo[];
    handleAddToDo: (task: string) => void; //call signature
    toggleTodoAsCompleted: (task: string) => void;
    handleDeleteTodo: (task: string) => void;
}

export const todosContext = createContext<TodoContext | null>(null)

export const TodosProvider = ({ children }: TodosProviderProps) => {

    const [todos, setTotos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem('todo') || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    })

    const handleAddToDo = (task: string) => {
        setTotos((prev) => {
            const newTodo: Todo[] = [
                {
                    id: Math.random().toString(),
                    task: task,
                    completed: false,
                    createdAt: new Date()


                },
                ...prev
            ]
            // console.log("new----->", newTodo)
            localStorage.setItem("todo", JSON.stringify(newTodo))
            return newTodo
        })
    }

    const toggleTodoAsCompleted = (id: string) => {
        setTotos((prev) => {
            let newTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
            return newTodos;
        })
    }

    const handleDeleteTodo = (id: string) => {
        setTotos((prev) => {
            let newTodos = prev.filter((todo) => todo.id !== id)
            localStorage.setItem("todo", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    return <todosContext.Provider value={{ todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo }}>
        {children}
    </todosContext.Provider>
}

export const useTodos = () => {
    const todosConsumer = useContext(todosContext);
    if (!todosConsumer) {
        throw new Error("Use Todos used outside of provider.");

    }
    return todosConsumer;
}

