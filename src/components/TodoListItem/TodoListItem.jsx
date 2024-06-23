import React, { useState } from "react";
import PropTypes from 'prop-types';

const TodoListItem = ({ todo, onRemoveTodo, onCompleteTodo, onUpdateTodo }) => {

  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isEdit, setIsEdit] = useState(false);

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEdit(false);
      onUpdateTodo(todo.id, todoTitle)
    }
  }

  return (
    <>
      <li className="list-item">
        <input type="checkbox" onChange={() => onCompleteTodo(todo.id)} checked={todo.completedAt}  />
        {isEdit ? <input type="text" value={todoTitle} onChange={handleTitleChange} onKeyDown={handleKeyDown}/> : todo.title}
        <div>
          {todo.dueDate}
        </div>
        <button className="btn"
          onClick={() => {
            onRemoveTodo(todo.id);
          }}
        >
          Remove
        </button>

        {!isEdit && <button className="edit-btn"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Edit
        </button> }
      </li>
    </>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  onRemoveTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};

export default TodoListItem;
