import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useFetch from '../FetchData/useFetch';
import Cart from './Cart';
import Modal from 'react-bootstrap/Modal';
import Loading from './loadCintent/Loading';
import Pagination from 'react-bootstrap/Pagination';

const Items = ({ category, country, searchTerm, sortCriteria }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, error, isLoading } = useFetch('http://localhost:8080/foods');
  const [filteredData, setFilteredData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (data) {
      let filtered = data.filter((item) => {
        if (category && category !== 'All') {
          return item.strCategory === category;
        }
        return true;
      }).filter((item) => {
        if (country && country !== 'All') {
          return item.strArea === country;
        }
        return true;
      }).filter((item) => {
        return item.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
      });

      switch (sortCriteria) {
        case 'delivery_time':
          filtered = filtered.sort((a, b) => a.strArea.localeCompare(b.strArea));
          break;
        case 'rating':
          // There is no rating field in the schema
          break;
        case 'cost_low_to_high':
          filtered = filtered.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
          break;
        case 'cost_high_to_low':
          filtered = filtered.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
          break;
        default:
          break;
      }

      setFilteredData(filtered);
      setCurrentPage(1);  // Reset to first page on data/filter change
    }
  }, [data, category, country, searchTerm, sortCriteria]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      {error && <div>{error.message}</div>}
      {isLoading && 
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Loading />
        </div>
      }
      {filteredData && (
        <>
          <Row>
            {currentItems.map((item) => (
              <Col key={item.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card
                  className="zoom-effect"
                  style={{ backgroundColor: '#baf8da', border: '#13824d 1px solid'}}
                >
                  <Card.Img
                    variant="top"
                    src={item.strMealThumb}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    onClick={() => handleSelectItem(item)}  
                  />
                  <Card.Body style={{color: '#042f1d'}}>
                    <Card.Title>{item.strMeal}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <Card.Text>Delivered by {item.strArea}</Card.Text>
                    <Cart id={item.idMeal} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center mt-4 custom-pagination">
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </>
      )}
      <Modal show={selectedItem !== null} onHide={handleCloseModal} className='model'>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem && selectedItem.strMeal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <img src={selectedItem.strMealThumb} alt={selectedItem.strMeal} style={{ width: '100%', marginBottom: '20px' }} />
              <p>Price: {selectedItem.price}</p>
              <p>Area: {selectedItem.strArea}</p>
              <p>Category: {selectedItem.strCategory}</p>
              {selectedItem.ingredients && (
                <ul>
                  {selectedItem.ingredients.split(', ').map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              <Cart id={selectedItem.idMeal} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Items;
