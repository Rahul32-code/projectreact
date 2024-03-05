import "./style.css"
import { useState } from "react"
import { useEffect } from "react"

function App() {
  const [todo, setTodo] = useState("") //input text ha
  const [todos, setTodos] = useState([]) //hold all array

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault()

    if (!todo.trim()) return;

    setTodos([...todos, {
      id: crypto.randomUUID(), // Ensure each todo has a unique id
      title: todo,
      completed: false,
    }]);

    setTodo("");

    saveToLS();

    // console.log(todos)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodo(newTodos)
    // console.log(newTodos)
    // console.log(newTodos, todos)
    saveToLS()
  }

  const handelDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <>
      <form action="" className="nav-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input type="text" id="item" value={todo}
            onChange={handleChange}
          />
          <button className="btn" onClick={handleAdd}>Add</button>
        </div>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "noTodos"}
        {todos.map(
          item => {
            return <li
              key={item.id}
            >
              <label>
                <input type="checkbox" name={item.id}
                  value={item.completed}
                  onChange={handleCheckbox}
                />
                {item.title}
              </label>
              <button className="btn btn-danger" onClick={() => handelDelete(item.id)}>Delete</button>
            </li>
          }
        )}
      </ul>
    </>
  )
}

export default App
