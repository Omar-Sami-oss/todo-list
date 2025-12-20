import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TodoList from './Components/TodoList';
import TodoDetail from './Components/TodoDetail';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  // Initialize todos from localStorage using lazy initial state
  // This prevents the unnecessary save that occurred when loading from useEffect
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });
  
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Save todos to localStorage whenever todos change (but not on initial load)
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`} data-bs-theme={theme === 'dark' ? 'dark' : undefined}>
      <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
        <Router>
          <Routes>
            <Route path="/" element={
              <TodoList
                todos={todos}
                addTodo={addTodo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            } />
            <Route path="/todo/:id" element={<TodoDetail todos={todos} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
