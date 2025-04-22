import React, { useState } from "react";

const TodoItem = ({ todo, completeTodo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() !== "") {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`flex items-center p-3 border-b ${
        todo.completed ? "bg-blue-50" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => completeTodo(todo.id, e.target.checked)}
        className="w-5 h-5 text-blue-500 border-blue-300 rounded"
      />

      {isEditing ? (
        <div className="flex-1 flex ml-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border border-blue-300 rounded"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="ml-2 px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <span
          className={`flex-1 ml-3 ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      <div className="flex space-x-1">
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-2 py-1 bg-blue-200 text-blue-700 text-sm rounded hover:bg-blue-300"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
