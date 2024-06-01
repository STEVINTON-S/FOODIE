import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import usePostData from '../usePut/usePutData';

const OrderPlaced = () => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dataPosted, setDataPosted] = useState(false); // Track if data has been posted

  const getItemsFromLocalStorage = () => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : {};
  };

  const { response, error: postError, postData } = usePostData('http://localhost:8080/orderPlaced');

  useEffect(() => {
    const fetchItems = async () => {
      const items = getItemsFromLocalStorage();
      const itemArray = Object.entries(items).map(([id, count]) => ({ id, count }));

      try {
        const results = await Promise.all(
          itemArray.map(async ({ id, count }) => {
            try {
              const response = await fetch(`http://localhost:8080/foods/${id}`);
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
        setShowConfetti(true);
        setIsLoading(false); // Set loading to false here

        // If data hasn't been posted yet, post it
        if (!dataPosted) {
          const totalPrice = results.reduce((total, item) => total + item.price * item.count, 0);

          const order = {
            items: results.map(item => ({
              itemId: item.id,
              name: item.name,
              count: item.count,
              price: item.price,
            })),
            totalPrice,
            deliveryAddress: '123, 4th street, echanari, coimbatore',
            status: 'Delivered',
            paymentMethod: 'Cash on Delivery',
            contactInfo: {
              Phone: 9876543210,
              email: 'abc123@gmail.com',
            },
          };

          await postData(order); // Post data here after items have been fetched and formatted
          setDataPosted(true); // Set dataPosted to true after posting data
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      {showConfetti && <Confetti />}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {postError && <p>Error: {postError}</p>}
      {fetchedItems.length > 0 && !isLoading && (
        <div className="text-center">
          <h1>Order Placed</h1>
          <h2>Thank you for your order!</h2>
          <p>Your order will be delivered within an hour.</p>
        </div>
      )}
    </div>
  );
};

export default OrderPlaced;
