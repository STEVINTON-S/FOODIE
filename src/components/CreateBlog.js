import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateBlog = () => {

  const handleSubmit = () =>{

  }

  return (
    <div>
      <h1 className='text-center mt-5 text-decoration-underline'>Create Blog</h1>
        <div className="d-flex justify-content-center align-items-center vh-80">
          <Form className="border p-4 rounded w-50">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blogger</Form.Label>
              <Form.Control type="email"/>
            </Form.Group>
            <Button className="w-100" variant="primary" onClick={handleSubmit}>Send</Button>
          </Form>
        </div>
        </div>
  )
}

export default CreateBlog
