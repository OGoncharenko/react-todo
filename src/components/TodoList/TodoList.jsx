import React from "react";
import TodoListItem from "../TodoListItem/TodoListItem";

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

export default TodoList;
