import React, { useState } from "react";
import InputWithLabel from "../InputTodo/InputWithLabel";
import PropTypes from 'prop-types';
import "/src/App.css";
import style from './AddTodoForm.module.css'

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo({ id: Date.now(), title: todoTitle, dueDate: todoDueDate });
    setTodoTitle("");
    setTodoDueDate("");
  };

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleDueDateChange = (event) =>{
    const newTodoDueDate = event.target.value;
    setTodoDueDate(newTodoDueDate);
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
      <input 
      className={style["input-due-date"]}
      type="date"
      id="todoDueDate"
      value={todoDueDate}
      name="dueDate"
      onChange={handleDueDateChange} />
      <button type="submit" className={style["add-btn"]}>Add</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired
};

export default AddTodoForm;

