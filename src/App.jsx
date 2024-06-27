import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import CompletedTodoContainer from "./components/CompletedTodoContainer/CompletedTodoContainer";
import Sidenav from "./components/Sidenav/Sidenav";
import About from "./components/About/About.jsx";

const App = () => {

  return (
  <>
    <BrowserRouter>
      <Sidenav />
      <Routes>
        <Route path="/" element={ <TodoContainer /> } />
        <Route path="/completed" element={<CompletedTodoContainer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    <footer className="footer">By Olga Goncharenko, 2024</footer>
  </>
  );
}

export default App;
