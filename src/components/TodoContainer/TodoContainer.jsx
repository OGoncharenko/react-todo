import React, { useState, useEffect } from "react";
import AddTodoForm from "../AddTodo/AddTodoForm";
import TodoList from "../TodoList/TodoList";
import { url } from "../../modules/api.module";
import "/src/App.css";
import style from './TodoContainer.module.css'

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
  const [sort, setSort] = useState({"field": "createdTime", "direction": "asc"});

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

  useEffect(() => {
    setTodoList(sortTodoList(todoList));
  }, [sort.field, sort.direction]);

    const sortTodoList = (list) => {
      const sortedTodoList = [...list].sort((a, b) => {
        if (sort.field === "title") {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return sort.direction === "asc" ? -1 : 1;
          if (titleA > titleB) return sort.direction === "asc" ? 1 : -1;
          return 0;
        } else {
          const titleA = a.createdTime.toLowerCase();
          const titleB = b.createdTime.toLowerCase();
          if (titleA < titleB) return sort.direction === "asc" ? -1 : 1;
          if (titleA > titleB) return sort.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
      return sortedTodoList;
    }

  const addTodo = async (newTodo) => {
    const fields = {
      Title: newTodo.title
    }
    if (!!newTodo.dueDate) {
      fields['dueDate'] = newTodo.dueDate
    }

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: fields }),
    };

    try {
      const response = await fetch(url, options);

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

      let updatedTodoList = [...todoList, newTodo];

      updatedTodoList = sortTodoList(updatedTodoList);
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

      let removeTodoList = todoList.filter((todoListItem) => {
        return todoListItem.id !== id;
      });
      removeTodoList = sortTodoList(removeTodoList);
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

    const updatedTodoList = todoList.filter((todo) => todo.id !== id)
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error completing todo", error);
    }
  };

  const updateTodo = async (id, title) => {
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
  const handleSortClick = (sortField) => {
    if (sort.field === sortField) {
      setSort({ field: sortField, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      setSort({ field: sortField, direction: "asc" });
    }
  }

  return (
    <div className={style["container"]}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className={style["control-container"]}>
          <input
            className={style["search-input"]}
            type="search"
            onChange={handleSearch}
            value={searchValue}
            placeholder="search your todo"
          />
          <button className={style["toggle-btn"]} onClick={() => handleSortClick("createdTime")}>
            Sort by Date ({ sort.field === "createdTime" && sort.direction === "asc" ? <i className="fa-solid fa-arrow-up-short-wide"></i> : <i className="fa-solid fa-arrow-down-wide-short"></i>})
          </button>
          <button className={style["toggle-btn"]} onClick={() => handleSortClick("title")}>
            Sort by name ({ sort.field === "title" && sort.direction === "asc" ? <i className="fa-solid fa-arrow-up-a-z"></i> : <i className="fa-solid fa-arrow-down-z-a"></i>})
          </button>
        </div>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
          />
        </>
      )}
    </div>
  );
}

export default TodoContainer;

