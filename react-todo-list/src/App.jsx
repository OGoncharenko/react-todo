import './App.css'

function App() {

  const todoList = [
    {
      title: 'Complete the assignment 1',
      id: 1,
    },
    {
      title: 'Complete the assignment 2',
      id: 2,
    },
    {
      title: 'Complete the assignment 3',
      id: 3,
    }
  ];

  return (
    <>
      <h1 className="header">Todo List</h1>
      <ul>
        {
          todoList.map(function(item) {
          return <li key={item.id}>{item.title}</li>;
          })
        }
      </ul>
    </>
  )
}

export default App;