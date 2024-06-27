import React, { useState } from "react";
import PropTypes from "prop-types";
import "/src/App.css";
import style from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo, onCompleteTodo, onUpdateTodo }) => {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isEdit, setIsEdit] = useState(false);

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEdit(false);
      onUpdateTodo(todo.id, todoTitle);
    }
  };

  return (
    <>
      <li className={style["list-item"]}>
        <div className={style["list-item-text"]}>
          {isEdit ? (
              <input
                  type="text"
                  value={todoTitle}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
              />
          ) : (
              <div className={style["list-item-title"]}>{todo.title}</div>
          )}
          {todo.dueDate && <div className={style["list-item-due-date"]}>Due date: {todo.dueDate}</div>}
          <label className={style["list-item-complete"]}>
            <input
                className={style["checkbox"]}
                type="checkbox"
                onChange={() => onCompleteTodo(todo.id)}
                checked={todo.completedAt}
                title="Complete"
            />
            {todo.completedAt ? "Uncomplete the task" : "Mark as completed"}
          </label>
        </div>
        <div className={style["list-item-controls"]}>
          <button
              className={style["remove-btn"]}
              onClick={() => {
                onRemoveTodo(todo.id);
              }}
              title="Remove"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          {!isEdit && (
            <button
              className={style["edit-btn"]}
              onClick={() => {
                setIsEdit(true);
              }}
              title="Edit"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          )}
        </div>
      </li>
    </>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onRemoveTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};

export default TodoListItem;
