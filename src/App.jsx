import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {

  return (
    <>
      <h1 className="header">Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </>
  );
}

export default App;
