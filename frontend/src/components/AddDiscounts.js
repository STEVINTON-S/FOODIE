import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import usePostData from '../usePut/usePutData';

const AddDiscounts = () => {
    const [thumbNailImg, setThumbNailImg] = useState('');
    const [dishId, setDishId] = useState('');
    const [offer, setOffer] = useState('');
    const [content, setContent] = useState('');

    const { postData, isLoading, error } = usePostData('http://localhost:8080/admin/discounts');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postDataResponse = await postData({ thumbNailImg, dishId, offer, content });
            console.log('Data posted:', postDataResponse);
        } catch (err) {
            console.error('Error posting data:', err);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h1 className="text-center mb-4">Add Discount</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="imageUrl">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control type="text" placeholder="Enter image URL" onChange={(e) => setThumbNailImg(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="dishId">
                                    <Form.Label>Dish ID</Form.Label>
                                    <Form.Control type="text" placeholder="Enter dish ID" onChange={(e) => setDishId(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="discountPercent">
                                    <Form.Label>Discount Percent</Form.Label>
                                    <Form.Control type="number" placeholder="Enter discount percent" onChange={(e) => setOffer(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="content">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control type="text" placeholder="Enter content" onChange={(e) => setContent(e.target.value)} />
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
    );
}

export default AddDiscounts;
