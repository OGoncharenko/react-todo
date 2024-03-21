import React from "react";

const AddTodoForm = ({ onAddTodo }) => {
  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.value);
    let title = event.target.title.value;
    onAddTodo(title);
    event.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor="todoTitle">Title</label>
        <input type="text" id="todoTitle" name="title" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
