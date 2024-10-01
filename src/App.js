import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './reducers/todosReducer';
import TodoList from './components/TodoList';

const App = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = text => {
    const newTodo = { id: Date.now(), text, completed: false };
    dispatch(addTodo(newTodo));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleAddTodo(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <TodoList todos={todos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
    </div>
  );
};

export default App;
