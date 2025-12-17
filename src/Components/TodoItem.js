import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  const { theme } = useTheme();
  return (
    <ListGroup.Item className={`d-flex justify-content-between align-items-center ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="me-2"
        />
        <Link to={`/todo/${todo.id}`} className={`text-decoration-none ${todo.completed ? 'text-decoration-line-through' : ''} ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
          {todo.text}
        </Link>
      </div>
      <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default TodoItem;