import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

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
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        type="text"
        id="todoTitle"
        value={todoTitle}
        name={"title"}
        onChange={handleTitleChange}
        isFocused={true}
      >
        Title
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
