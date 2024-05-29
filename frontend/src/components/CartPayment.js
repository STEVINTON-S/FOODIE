import React, { useEffect, useState } from 'react';

const CartPayment = ({ fetchedItems }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const tot = fetchedItems.reduce((accumulator, item) => {
      return accumulator + (item.count * item.price);
    }, 0);
    setTotal(tot);
  }, [fetchedItems]);

  return (
    <div className="cart-payment">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="border-bottom">
          {fetchedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.strMeal}</td>
              <td>{item.count}</td>
              <td>${(item.price * item.count).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="total-table text-end">
        <thead>
          <tr>
            <th>Total</th>
            <th>${total.toFixed(2)}</th>
          </tr>
        </thead>
      </table>
      <button className='btn btn-success'>Proceed Payment ${total.toFixed(2)}</button>
    </div>
  );
};

export default CartPayment;
