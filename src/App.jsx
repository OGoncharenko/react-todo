import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import CompletedTodoContainer from "./components/CompletedTodoContainer/CompletedTodoContainer";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <TodoContainer /> } />
        <Route path="/completed" element={<CompletedTodoContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
