import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url+"/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders.');
      }
    } catch (error) {
      toast.error('Error fetching orders.');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url+"/api/order/status", {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully.');
      } else {
        toast.error('Failed to update order status.');
      }
    } catch (error) {
      toast.error('Error updating order status.');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order-add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-items-food">
                {order.items.map((item) => `${item.name} X ${item.quantity}`).join(', ')}
              </p>
              <p className="order-item-name">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div className="order-item-address">
                <p>{`${order.address.coachNumber} ${order.address.seatNumber} ${order.address.birth}`}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out to Serve">Out to Serve</option>
              <option value="Delivered to Seat">Delivered to Seat</option>
            </select>
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Ensure ToastContainer is included here */}
    </div>
  );
};

export default Orders;
