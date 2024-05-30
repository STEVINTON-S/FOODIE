import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import usePostData from '../usePut/usePutData';

const Help = () => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { postData } = usePostData('http://localhost:8080/help');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name && description) {
      try {
        const postDataResponse = await postData({ name, description });
      } catch (err) {
        console.error('Error posting data:', err);
      }
    }
  }

  return (
    <div>
      <h1 className='text-center mt-5 text-decoration-underline'>Contact Us</h1>
    <div className="d-flex justify-content-center align-items-center vh-80">
      <Form className="border p-4 rounded w-50">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name </Form.Label>
          <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>
        <Button className="w-100" variant="primary" onClick={handleSubmit}>Send</Button>
      </Form>
    </div>
    </div>
  );
}

export default Help;
