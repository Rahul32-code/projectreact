import "./style.css"
import { useState } from "react"

function App() {
  const [newItem, setNewItem] = useState("") //input text ha
  const [todos, setTodos] = useState([]) //hold all array

  function handelSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos, {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false
        },]
    })

    setNewItem("")

    // setTodos([...todos, {
    //   id: crypto.randomUUID(),
    //   title: newItem,
    //   completed: false
    // },])
    // setTodos([...todos, {
    //   id: crypto.randomUUID(),
    //   title: newItem,
    //   completed: false
    // },])
  }

  console.log(todos)

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deteleTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todos.id !== id)
    })
  }
  
  const handleChange = (e) => {
    setNewItem(e.target.value)
  }

  const handleAdd = () => {
    setTodos(...todos, {
      todo,
      iscompleted: false
    })
    setNewItem("")
  }

  return (
    <>
      <form action="" className="nav-item-form"
      //  onSubmit={handelSubmit}
       >
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" id="item" value={newItem}
            // onChange={e => setNewItem(e.target.value)}
            onChange={handleChange}
          />
          <button className="btn" onClick={handleAdd}>Add</button>
        </div>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "noTodos"}
        {todos.map(
          todo => {
            return <li key={todo.id}>
              <label>
                <input type="checkbox" name="" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button className="btn btn-danger" onClick={() =>
                deteleTodo(todos.id)
              }>Delete</button>
            </li>
          }
        )}
      </ul>
    </>
  )
}

export default App
