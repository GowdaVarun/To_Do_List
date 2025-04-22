import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleaddTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const completeTodo = (id, completed) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const editTodo = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            To-Do List
          </h1>

          <div className="flex mb-4">
            <input
              className="flex-1 px-4 py-2 border border-blue-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              placeholder="Add a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
              onClick={handleaddTodo}
            >
              Add
            </button>
          </div>

          <div className="flex mb-6 space-x-2">
            <button
              className={`flex-1 py-2 rounded ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`flex-1 py-2 rounded ${
                filter === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`flex-1 py-2 rounded ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <div className="space-y-2">
            {todos
              .filter((todo) => {
                if (filter === "all") return true;
                if (filter === "active") return !todo.completed;
                if (filter === "completed") return todo.completed;
                return true;
              })
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  completeTodo={completeTodo}
                  editTodo={editTodo}
                  deleteTodo={() => {
                    setTodos(todos.filter((t) => t.id !== todo.id));
                  }}
                />
              ))}
          </div>

          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No tasks yet. Add one above!
            </p>
          )}

          {todos.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 text-right">
              {todos.filter((t) => !t.completed).length} items left
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
