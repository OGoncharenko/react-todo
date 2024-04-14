import { useState, useEffect } from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todoListItem) => {
      return todoListItem.id !== id;
    });
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1 className="header">Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
