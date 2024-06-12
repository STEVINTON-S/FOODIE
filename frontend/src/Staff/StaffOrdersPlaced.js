// StaffOrdersPlaced.js
import React, { useEffect, useState } from 'react';
import useFetch from '../FetchData/useFetch';
import { Pagination, Table, Spinner } from 'react-bootstrap';
import '../Staff/staff.css'; 
import Loading from '../components/loadCintent/Loading';

const StaffOrdersPlaced = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Set the number of orders per page
  const { data, error, isLoading } = useFetch(`http://localhost:8080/orders`);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = data ? data.slice(indexOfFirstOrder, indexOfLastOrder) : [];
  const totalPages = data ? Math.ceil(data.length / ordersPerPage) : 1;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='m-5'>
      <h1 className='my-5'>Orders Placed</h1>
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Delivery Address</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Contact Info</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.status}</td>
              <td>{order.paymentMethod}</td>
              <td>
                Phone: {order.contactInfo.Phone} <br />
                Email: {order.contactInfo.email}
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center custom-pagination">
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {Array.from({ length: totalPages }, (_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => paginate(idx + 1)}
            style={{
              backgroundColor: idx + 1 === currentPage ? '#13824d' : 'transparent',
              color: idx + 1 === currentPage ? '#fff' : '#13824d',
              borderColor: '#13824d',
            }}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </div>
  );
};

export default StaffOrdersPlaced;
