import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    coachNumber: "",
    seatNumber: "",
    birth: "",
    trainNumber: "",
    nof: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] && cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Make a shallow copy of the item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      alert("No items in the cart to order.");
      return;
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("There was an issue processing your order. Please try again.");
    }
  };
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='coachNumber' onChange={onChangeHandler} value={data.coachNumber} type="text" placeholder='Coach Number' />
        <div className="multi-fields">
          <input required name='seatNumber' onChange={onChangeHandler} value={data.seatNumber} type="text" placeholder='Seat Number' />
          <select required name="birth" onChange={onChangeHandler} value={data.birth}>
            <option value="" disabled>Select Birth</option>
            <option value="LB">LB</option>
            <option value="MB">MB</option>
            <option value="UP">UP</option>
            <option value="Side UP">Side UP</option>
            <option value="Side LB">Side LB</option>
          </select>
        </div>
        <div className="multi-fields">
          <input required name='trainNumber' onChange={onChangeHandler} value={data.trainNumber} type="text" placeholder='Train Number' />
          <input required name='nof' onChange={onChangeHandler} value={data.nof} type="text" placeholder='Number Of People' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Platform Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
