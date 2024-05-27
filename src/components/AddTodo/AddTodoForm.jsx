import React, { useState } from "react";
import InputWithLabel from "../InputTodo/InputWithLabel";
import style from './AddTodoForm.module.css'

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ id: Date.now(), title: todoTitle });
    setTodoTitle("");
  };

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  return (
    <form onSubmit={handleAddTodo} className={style["add-todo-form"]}>
      <InputWithLabel
        type="text"
        id="todoTitle"
        value={todoTitle}
        name={"title"}
        onChange={handleTitleChange}
        isFocused={true}
      />
      <button type="submit" className="btn">Add</button>
    </form>
  );
};

export default AddTodoForm;
