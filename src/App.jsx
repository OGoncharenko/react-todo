import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import CompletedTodoContainex from "./components/CompletedTodoContainer/CompletedTodoContainer";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <TodoContainer /> } />
        <Route path="/completed" element={<CompletedTodoContainex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
