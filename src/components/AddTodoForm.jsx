import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ id: Date.now(), title: todoTitle });
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor="todoTitle">Title</label>
        <input
          type="text"
          id="todoTitle"
          name="title"
          value={todoTitle}
          onChange={handleTitleChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
