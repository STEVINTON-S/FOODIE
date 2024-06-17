import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import usePostData from '../usePut/usePutData';
import Loading from './loadCintent/Loading';

const OrderPlaced = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dataPosted, setDataPosted] = useState(false); // Track if data has been posted
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { response, error: postError, postData } = usePostData('http://localhost:8080/orderPlaced');

  const getItemsFromLocalStorage = () => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : {};
  };

  useEffect(() => {
    const items = getItemsFromLocalStorage();
    const itemArray = Object.entries(items).map(([id, count]) => ({ id, count }));
    const fetchedItems = itemArray.map(({ id, count }) => {
      const item = {
        id,
        count,
      };
      return item;
    });
    setFetchedItems(fetchedItems);
    setShowConfetti(true);

    // If data hasn't been posted yet, post it
    if (!dataPosted) {
      const totalPrice = fetchedItems.reduce((total, item) => total + item.price * item.count, 0);

      const order = {
        items: fetchedItems.map(item => ({
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

      postData(order);
      setDataPosted(true);
    }
    setIsLoading(false);
  }, [postData, dataPosted]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      {showConfetti && <Confetti />}
      {isLoading && <Loading/>}
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
