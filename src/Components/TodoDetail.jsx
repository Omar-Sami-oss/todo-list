import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const TodoDetail = ({ todos }) => {
  const { id } = useParams();
  const todo = todos.find(t => t.id === parseInt(id));

  if (!todo) {
    return <Container><h2>Todo not found</h2></Container>;
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{todo.text}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> {todo.completed ? 'Completed' : 'Incomplete'}<br />
            <strong>Created At:</strong> {new Date(todo.createdAt).toLocaleString()}
          </Card.Text>
          <Link to="/">
            <Button variant="primary">Back to List</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TodoDetail;