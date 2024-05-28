import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from '../FetchData/useFetch';
import Cart from './Cart';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const Items = ({ category, searchTerm, sortCriteria }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, error, isLoading } = useFetch('http://localhost:8080/foods');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      let filtered = data.filter((item) => {
        if (category && category !== 'All') {
          return item.category === category;
        }
        return true;
      }).filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      switch (sortCriteria) {
        case 'delivery_time':
          filtered = filtered.sort((a, b) => a.expected_delivery_time.localeCompare(b.expected_delivery_time));
          break;
        case 'rating':
          filtered = filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'cost_low_to_high':
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        case 'cost_high_to_low':
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      

      setFilteredData(filtered);
    }
  }, [data, category, searchTerm, sortCriteria]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <Container>
      {error && <div>{error.message}</div>}
      {isLoading && 
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {filteredData && (
        <Row>
          {filteredData.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className="zoom-effect"
                style={{ backgroundColor: '#E1F7F5' }}
              >
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onClick={() => handleSelectItem(item)}  
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
      <Modal show={selectedItem !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem && selectedItem.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', marginBottom: '20px' }} />
              <p>Price: ${selectedItem.price}</p>
              <p>Expected Delivery Time: {selectedItem.expected_delivery_time}</p>
              <p>⭐{selectedItem.rating}/5</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Items;
