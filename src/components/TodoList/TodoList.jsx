import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";
import PropTypes from 'prop-types';
import "../../App.css";
import './styles.css'


const TodoList = ({ todoList, onRemoveTodo, onCompleteTodo, onUpdateTodo, style }) => {
  return (
    <ul className="list" style={style}>
      {todoList.map(function (todo) {
        return (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo} />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  onRemoveTodo: PropTypes.func,
  onCompleteTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
  style: PropTypes.object
};

export default TodoList;
