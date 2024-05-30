import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import usePostData from '../usePut/usePutData';

const CreateBlog = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dish, setDish] = useState('');
  const [rating, setRating] = useState('');
  const [recipe, setRecipe] = useState('');

  const { postData, isLoading, error } = usePostData('http://localhost:8080/blog/create');

  const handleSubmit = async () => {
    try {
      const postDataResponse = await postData({ name, description, dish, rating, recipe });
      console.log('Data posted:', postDataResponse);
    } catch (err) {
      console.error('Error posting data:', err);
    }
  };

  return (
    <div>
      <h1 className='text-center mt-5 text-decoration-underline'>Create Blog</h1>
      <div className="d-flex justify-content-center align-items-center vh-80">
        <Form className="border p-4 rounded w-50">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Give Dish Name</Form.Label>
            <Form.Control type="text" value={dish} onChange={(e) => setDish(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Give Description</Form.Label>
            <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Give Rating</Form.Label>
            <Form.Control type="text" value={rating} onChange={(e) => setRating(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Suggest Any Recipe</Form.Label>
            <Form.Control type="text" value={recipe} onChange={(e) => setRecipe(e.target.value)}/>
          </Form.Group>
          <Button className="w-100" variant="primary" onClick={handleSubmit}>Send</Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateBlog;
