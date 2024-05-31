import React, { useEffect, useState } from 'react';
import CartPayment from './CartPayment';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewCart = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getItemsFromLocalStorage = () => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : {};
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items = getItemsFromLocalStorage();
      const itemArray = Object.entries(items).map(([id, count]) => ({ id, count }));

      try {
        const results = await Promise.all(
          itemArray.map(async ({ id, count }) => {
            try {
              const response = await fetch(`http://localhost:8080/foods/${id}`);
              console.log(response);
              if (!response.ok) {
                throw new Error(`Failed to fetch item with id ${id}`);
              }
              const data = await response.json();
              return { ...data, count, price: parseFloat(data.price.replace('$', '')) };
            } catch (err) {
              console.error(`Error fetching item with id ${id}:`, err.message);
              throw err;
            }
          })
        );
        setFetchedItems(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleIncrement = (id) => {
    const items = getItemsFromLocalStorage();
    const newItems = { ...items, [id]: (items[id] || 0) + 1 };
    localStorage.setItem('items', JSON.stringify(newItems));
    setFetchedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    const items = getItemsFromLocalStorage();
    if (items[id] > 0) {
      const newItems = { ...items, [id]: items[id] - 1 };
      if (newItems[id] === 0) {
        delete newItems[id];
      }
      localStorage.setItem('items', JSON.stringify(newItems));
      setFetchedItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
        )
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">View Cart</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {isLoading && <div className="alert alert-info">Loading...</div>}
      {fetchedItems.length > 0 ? (
        <ul className="list-group mb-4">
          {fetchedItems.map((item, index) => (
            <li key={index} className="list-group-item m-2">
              <div className="d-flex align-items-center">
                <img src={item.strMealThumb} alt={item.strMeal} className="cartImage img-fluid me-3" />
                <div className="flex-grow-1">
                  <p className="mb-1"><strong>{item.strMeal}</strong></p>
                  <p className="mb-1"><strong>Price: </strong>${item.price.toFixed(2)}</p>
                  <div className="d-flex align-items-center">
                    <button onClick={() => handleDecrement(item._id)} className="btn btn-outline-secondary btn-sm me-2">-</button>
                    <p className="mb-0 me-2">{item.count}</p>
                    <button onClick={() => handleIncrement(item._id)} className="btn btn-outline-secondary btn-sm">+</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Your cart is empty</p>
      )}
      <CartPayment fetchedItems={fetchedItems} />
    </div>
  );
};

export default ViewCart;
