import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className="list">
      {todoList.map(function (todo) {
        return (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
