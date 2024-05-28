import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from '../FetchData/useFetch';
import Cart from './Cart';

const Items = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/foods');

  return (
    <Container>
      {error && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <Row>
          {data.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ backgroundColor: '#E1F7F5' }}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>${item.price}</Card.Text>
                  <Card.Text>Delivered by {item.expected_delivery_time}</Card.Text>
                  <Cart id={item.id} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Items;
