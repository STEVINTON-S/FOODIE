import React, { useEffect, useState } from 'react';

const CartPayment = ({ fetchedItems }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const tot = fetchedItems.reduce((accumulator, item) => {
      return accumulator + (item.count * item.price);
    }, 0);
    setTotal(tot);
  }, [fetchedItems]);

  console.log(total);

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
          {fetchedItems && fetchedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price * item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="total-table text-end">
        <thead>
          <tr>
            <th>Total</th>
            <th>$ {total > 0 ? (total.toFixed(2)) : 0}</th>
          </tr>
        </thead>
      </table>
      <button className='btn btn-success'>Proceed Payment $ {total > 0 ? (total.toFixed(2)) : 0}</button>
    </div>
  );
};

export default CartPayment;
