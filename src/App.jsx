import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <TodoContainer /> } />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
