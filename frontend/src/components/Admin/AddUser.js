import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePostData from '../../usePut/usePutData';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [kitchen, setKitchen] = useState('');
  const [password, setPassword] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');

  const { postData, isLoading, error } = usePostData('http://localhost:8080/admin/discounts');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postDataResponse = await postData({ name, email, kitchen, password, place, phone });
      console.log('Data posted:', postDataResponse);
    } catch (err) {
      console.error('Error posting data:', err);
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">Add User</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="kitchen">
                  <Form.Label>Kitchen Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter kitchen name" onChange={(e) => setKitchen(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="place">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter location" onChange={(e) => setPlace(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                <div className="text-center">
                  <button
                    className="btn text-white px-4 py-2"
                    style={{ background: 'linear-gradient(to bottom, #1acd81, #0fa968)', borderRadius: '5px', border: 'none' }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create'}
                  </button>
                </div>
                {error && <div className="text-danger mt-3">Error: {error}</div>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AddUser;
