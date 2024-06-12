import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateMenu = () => {
  const [mealData, setMealData] = useState({
    idMeal: '',
    strMeal: '',
    strCategory: '',
    strArea: '',
    strMealThumb: '',
    strTags: '',
    strYoutube: '',
    ingredients: '',
    price: '',
    kitchen: '',
    available: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMealData({
      ...mealData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/meals', mealData);
      console.log('Meal created successfully:', response.data);
      setMealData({
        idMeal: '',
        strMeal: '',
        strCategory: '',
        strArea: '',
        strMealThumb: '',
        strTags: '',
        strYoutube: '',
        ingredients: '',
        price: '',
        kitchen: '',
        available: false,
      });
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 mt-4">Update Menu</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Meal ID</Form.Label>
              <Form.Control type="text" name="idMeal" value={mealData.idMeal} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Meal Name</Form.Label>
              <Form.Control type="text" name="strMeal" value={mealData.strMeal} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="strCategory" value={mealData.strCategory} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" name="strArea" value={mealData.strArea} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Meal Thumbnail URL</Form.Label>
              <Form.Control type="text" name="strMealThumb" value={mealData.strMealThumb} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name="strTags" value={mealData.strTags} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>YouTube Link</Form.Label>
              <Form.Control type="text" name="strYoutube" value={mealData.strYoutube} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control as="textarea" name="ingredients" value={mealData.ingredients} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={mealData.price} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Kitchen</Form.Label>
              <Form.Control type="text" name="kitchen" value={mealData.kitchen} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check 
            type="checkbox" 
            label="Available" 
            name="available" 
            checked={mealData.available} 
            onChange={handleChange} 
          />
        </Form.Group>
        <Button type="submit" className="w-100 btn btn-success mb-5">Add Meal</Button>
      </Form>
    </Container>
  );
};

export default UpdateMenu;
