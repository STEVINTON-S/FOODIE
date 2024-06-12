import React from 'react';
import useFetch from '../../FetchData/useFetch';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../loadCintent/Loading';

const AdminHelps = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/showHelp');

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Admin Helps</h1>
      {error && <div className="text-danger text-center">{error.message}</div>}
      {isLoading && 
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Loading />
        </div>
      }
      {data && 
        data.map((help) => (
          <Card className="mb-4 shadow-sm" key={help._id}>
            <Card.Body>
              <Card.Title className="text-primary">{help.name}</Card.Title>
              <Card.Text>{help.description}</Card.Text>
              <button
                style={{ background: 'linear-gradient(to bottom, #1acd81, #0fa968)', borderRadius: '5px' }}
              >Rectify</button>
            </Card.Body>
          </Card>
        ))
      }
    </Container>
  );
}

export default AdminHelps;
