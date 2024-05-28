import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Help = () => {

  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () =>{
    if(email && content){
      console.log(email, content);
    }
  }

  return (
    <div>
      <h1 className='text-center mt-5 text-decoration-underline'>Contact Us</h1>
    <div className="d-flex justify-content-center align-items-center vh-80">
      <Form className="border p-4 rounded w-50">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
        </Form.Group>
        <Button className="w-100" variant="primary" onClick={handleSubmit}>Send</Button>
      </Form>
    </div>
    </div>
  );
}

export default Help;
