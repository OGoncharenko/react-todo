import React from "react";

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
      {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
};

export default TodoList;
