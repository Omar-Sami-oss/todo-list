import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Add a new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="primary">Add</Button>
      </InputGroup>
    </Form>
  );
};

export default AddTodo;