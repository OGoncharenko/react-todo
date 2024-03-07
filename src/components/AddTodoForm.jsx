import React from "react";

const AddTodoForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="todoTitle">Title</label>
        <input type="text" id="todoTitle" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
