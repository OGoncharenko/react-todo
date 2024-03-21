import { useState } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [newTodo, setNewTodo] = useState();

  return (
    <>
      <h1 className="header">Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
      <TodoList />
    </>
  );
}

export default App;
