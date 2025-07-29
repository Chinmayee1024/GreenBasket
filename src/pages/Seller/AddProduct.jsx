// src/components/AddProduct/AddProduct.jsx
import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import "../../css/seller/AddProduct.css";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="add-product-container">
      <form onSubmit={onSubmitHandler} className="product-form">
        <div>
          <p className="label">Product Image</p>
          <div className="image-upload-wrapper">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="upload-image"
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="form-textarea"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="form-input"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        <div className="price-wrapper">
          <div className="form-group small">
            <label className="label" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="form-input"
              required
            />
          </div>
          <div className="form-group small">
            <label className="label" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="form-input"
              required
            />
          </div>
        </div>

        <button className="submit-btn">ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;
