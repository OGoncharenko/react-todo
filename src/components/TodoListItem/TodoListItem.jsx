import React from "react";
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

const TodoListItem = ({ todo, onRemoveTodo }) => {
  return (
    <>
      <li className={style.ListItem}>
        {todo.title}
        <button className="btn"
          onClick={() => {
            onRemoveTodo(todo.id);
          }}
        >
          Remove
        </button>
      </li>
    </>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
