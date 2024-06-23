import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import CompletedTodoContainer from "./components/CompletedTodoContainer/CompletedTodoContainer";
import Sidenav from "./components/Sidenav/Sidenav";

const App = () => {

  return (
  <>
    <BrowserRouter>
      <Sidenav />
      <Routes>
        <Route path="/" element={ <TodoContainer /> } />
        <Route path="/completed" element={<CompletedTodoContainer />} />
        <Route path="/about" element={<div>About the app</div>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
