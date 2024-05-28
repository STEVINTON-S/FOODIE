import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ id }) => {
    const navigate = useNavigate();

    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('items');
        return savedItems ? JSON.parse(savedItems) : {};
    });

    useEffect(() => {
        const clearLocalStorageHourly = () => {
            localStorage.clear();
            setItems({});
        };
        const intervalId = setInterval(clearLocalStorageHourly, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleIncrement = () => {
        const newItems = { ...items, [id]: (items[id] || 0) + 1 };
        localStorage.setItem('items', JSON.stringify(newItems));
        setItems(newItems);
    };

    const handleDecrement = () => {
        const newItems = { ...items, [id]: (items[id] > 0 ? items[id] - 1 : 0) };
        if (newItems[id] === 0) {
            delete newItems[id];
        }
        localStorage.setItem('items', JSON.stringify(newItems));
        setItems(newItems);
    };

    const handleViewCart = () => {
        navigate('/cart', { state: { items } });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleDecrement}>-</button>
            <h1 style={{ margin: '0 10px' }}>{items[id] || 0}</h1>
            <button onClick={handleIncrement}>+</button>
            <button className='btn btn-success' style={{ marginLeft: '10px' }} onClick={handleViewCart}>View Cart</button>
        </div>
    );
};

export default Cart;
