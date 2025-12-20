import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button, Form, Alert, ListGroup } from 'react-bootstrap';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { useTheme } from '../contexts/ThemeContext';

const TodoList = ({ todos, addTodo, toggleComplete, deleteTodo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme } = useTheme();

  // Filter todos based on search term
  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Tasky</h1>

          {/* Theme Toggle */}
          <div className="text-center mb-3">
            <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </Button>
          </div>

          {/* Statistics */}
          <Alert variant={theme === 'dark' ? 'secondary' : 'info'} className="text-center">
            Total Todos: {totalTodos} | Completed: {completedTodos}
          </Alert>

          {/* Add Todo */}
          <AddTodo addTodo={addTodo} theme={theme} />

          {/* Search */}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>

          <ListGroup>
            {filteredTodos.length === 0 ? (
              <ListGroup.Item className="text-center">No todos found.</ListGroup.Item>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  theme={theme}
                />
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;