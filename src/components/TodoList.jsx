import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
  {
    title: "Complete the assignment 1",
    id: 1,
  },
  {
    title: "Complete the assignment 2",
    id: 2,
  },
  {
    title: "Complete the assignment 3",
    id: 3,
  },
];

const TodoList = () => {
  return (
    <ul>
      {todoList.map(function (todo) {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
