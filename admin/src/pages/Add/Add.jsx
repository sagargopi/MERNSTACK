import React, { useState, useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  // Form data change handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Image change handler
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Cleanup URL object on component unmount
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  // Form submission handler
  const handleSubmit = async(e) => {
    e.preventDefault();
   const formData = new FormData();
   formData.append("name",data.name)
   formData.append("description",data.description)
   formData.append("price",Number(data.price))
   formData.append("category",data.category)
   formData.append("image",image)
   const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        })
        setImage(null)
        toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)

    }

  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
          </label>
          <input
            onChange={handleImageChange}
            type='file'
            id='image'
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description" // Corrected to match state object
            rows='6'
            placeholder='Write Content here'
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Biryani">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="BreakFast">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='₹100'
            />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
}

export default Add;
