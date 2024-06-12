import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card, Button, Pagination } from "react-bootstrap";
import useFetch from "../FetchData/useFetch";
import Loading from "../components/loadCintent/Loading";
import axios from 'axios';
import '../Staff/staff.css'
import UpdateMenu from './UpdateMenu';
import StaffOrdersPlaced from './StaffOrdersPlaced';

const StaffHome = () => {
  const { id } = useParams();
  const { data: fetchedData, isLoading, error } = useFetch(`http://localhost:8080/foods/staff/${id}`);
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleSelectItem = async (itemId, currentAvailability) => {
    const newAvailability = !currentAvailability; // Toggle the availability
    try {
      const response = await axios.put(`http://localhost:8080/staff/updateAvailability/${itemId}`, { available: newAvailability });
      console.log('Availability updated successfully:', response.data);
      setData(prevData => prevData.map(item => 
        item.idMeal === itemId ? { ...item, available: newAvailability } : item
      ));
    } catch (error) {
      console.error('Error updating availability:', error);
      // Handle errors, such as displaying an error message to the user
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div className="items">
      {error && <div>{error.message}</div>}
      {isLoading && <Loading />}
      <h1 className="m-5">Staff Home</h1>
      <div className="row m-5">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Col key={item.idMeal} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className="zoom-effect"
                style={{ backgroundColor: '#baf8da', border: '#13824d 1px solid'}}
              >
                <Card.Img
                  variant="top"
                  src={item.strMealThumb}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onClick={() => handleSelectItem(item.idMeal, item.available)}  
                />
                <Card.Body style={{color: '#042f1d'}}>
                  <Card.Title>{item.strMeal}</Card.Title>
                  <Card.Title>{item.available ? 'Available' : 'Unavailable'}</Card.Title>
                  {item.available ? 
                    <Button className="btn btn-danger" onClick={() => handleSelectItem(item.idMeal, item.available)}>Unavailable</Button> 
                    : 
                    <Button className="btn btn-success" onClick={() => handleSelectItem(item.idMeal, item.available)}>Available</Button>}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No items found for this kitchen.</p>
        )}
      </div>
      <Pagination className="justify-content-center custom-pagination">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
      </div>
      <div className="UpdateMenu" style={{backgroundColor: '#b7fbc0'}}>
        <UpdateMenu/>
      </div>
      <div className="OrdersPlaced">
        <StaffOrdersPlaced/>
      </div>
    </div>
  );
};

export default StaffHome;
