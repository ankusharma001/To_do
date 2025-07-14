import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos(todos.map(todo =>
        todo.id === editId ? { ...todo, text: input } : todo
      ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    }

    setInput("");
  };

  const handleEdit = (id) => {
    const toEdit = todos.find(todo => todo.id === id);
    setInput(toEdit.text);
    setEditId(id);
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  return (
    <div className="app">
      <h1>📋 TODO List</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleDone(todo.id)}>
              {todo.done ? "✔ " : "◻ "} {todo.text}
            </span>
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
