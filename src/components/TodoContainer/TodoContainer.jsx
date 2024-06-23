import React, { useState, useEffect } from "react";
import AddTodoForm from "../AddTodo/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import { Link } from "react-router-dom";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function TodoContainer() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const url = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;

  const fetchData = async (search = "") => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
    const response = await fetch(
        `${url}?view=Grid%20view&sort[0][field]=createdTime&sort[0][direction]=${
          isAscending ? "asc" : "desc"
        }&filterByFormula=AND(SEARCH("${search}", {Title}), {completedAt} = "")`,
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
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAscending]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchData(debouncedSearchValue);
    } else {
      fetchData();
    }
  }, [debouncedSearchValue]);

  const addTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: { Title: newTodo.title, dueDate: newTodo.dueDate } }),
    };

    try {
      const response = await fetch(url, options);
      console.log({ response });

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const addTodoData = await response.json();
      const newTodo = {
        id: addTodoData.id,
        title: addTodoData.fields.Title,
        createdTime: addTodoData.fields.createdTime,
        completedAt: false,
        dueDate: addTodoData.fields.dueDate,
      };

      const updatedTodoList = [...todoList, newTodo];
      updatedTodoList.sort((a, b) => {
        const dateA = new Date(a.createdTime);
        const dateB = new Date(b.createdTime);
        return isAscending ? dateA - dateB : dateB - dateA;
      });

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error", error);
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

  const completeTodo = async (id) => {
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

  const updateTodo = async (id, title) => {
    const updatedTodo = todoList.find((todo) => {
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
            Title: title
        },
      }),
    };

    try {
      const response = await fetch(`${url}/${id}`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const updateTodoData = await response.json();
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id
          ? { ...todo, title: updateTodoData.fields.Title }
          : todo
      );
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <>
      <h1 className="header">Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input
            className="search-input"
            type="search"
            onChange={handleSearch}
            value={searchValue}
            placeholder="search"
          />
          <button onClick={toggleOrder}>
            Sort by Date ({isAscending ? "Ascending" : "Descending"})
          </button>
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
          />
        </>
      )}
      <AddTodoForm onAddTodo={addTodo} />
      <Link to="/completed">Completed todos</Link>
    </>
  );
}

export default TodoContainer;
