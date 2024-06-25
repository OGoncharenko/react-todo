import React, { useState, useEffect } from 'react'
import TodoList from "../TodoList/TodoList";
import { Link } from "react-router-dom";
import { url } from "../../modules/api.module";
import "/src/App.css";
import style from '../TodoContainer/TodoContainer.module.css'

const CompletedTodoContainer = () => {
    const [todoList, setTodoList] = useState([]);

      const fetchData = async (search = "") => {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        };
        try {
        const response = await fetch(
            `${url}?view=Grid%20view&filterByFormula=AND(SEARCH("${search}", {Title}), {completedAt} != "")`,
            options
          );
          
          if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
          }
    
          const data = await response.json();
          const todos = data.records.map((todo) => {
            return {
              id: todo.id,
              title: todo.fields.Title,
              createdTime: todo.fields.createdTime,
              completedAt: !!todo.fields.completedAt,
              dueDate: todo.fields.dueDate,
            };
          });
          setTodoList(todos);
        } catch (error) {
          console.error(error.message);
        }
      };

      const removeTodo = async (id) => {
        const options = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
        };
    
        try {
          const response = await fetch(`${url}/${id}`, options);
    
          if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
          }
    
          const removeTodoList = todoList.filter((todoListItem) => {
            return todoListItem.id !== id;
          });
          setTodoList(removeTodoList);
        } catch (error) {
          console.error("Error", error);
        }
      };

      const unCompleteTodo = async (id) => {
        const completedTodo = todoList.find((todo) => {
          return todo.id === id;
        });
        const options = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              completedAt: !!completedTodo.completedAt
                ? null
                : new Date().toISOString().substring(0, 10),
            },
          }),
        };
    
        try {
          const response = await fetch(`${url}/${id}`, options);
    
          if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
          }
    
          const completeTodoData = await response.json();
        const updatedTodoList = todoList.filter((todo) => todo.id !== id)
          setTodoList(updatedTodoList);
        } catch (error) {
          console.error("Error completing todo", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div className={style["container"]} style={{marginLeft: 0}}>
      <div className={style["control-container"]}></div>
        <TodoList
                todoList={todoList}
                onRemoveTodo={removeTodo}
                onCompleteTodo={unCompleteTodo}
            />
        <Link to="/">Back to dashboard</Link>
    </div>
  )
}

export default CompletedTodoContainer;

