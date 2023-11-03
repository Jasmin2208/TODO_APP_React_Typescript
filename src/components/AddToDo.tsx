import { FormEvent, useState } from "react"
import { useTodos } from "../store/todos";

function AddToDo() {
    const [todo, setToto] = useState("")
    const {handleAddToDo} = useTodos()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddToDo(todo)
        setToto("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={todo} onChange={(e) => setToto(e.target.value)} />
            <button type="submit">ADD</button>
        </form>
    )
}

export default AddToDo