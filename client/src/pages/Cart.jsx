/* eslint-disable react-hooks/exhaustive-deps */

// src/components/Cart.jsx

import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import "../css/Cart.css";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    navigate,
    products,
    currency,
    updateCartItem,
    removeFromCart,
    cartItems,
    getCartCount,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get("/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);
  useEffect(() => {
    if (user) {
      getUserAddresses();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="cart-container">
      <div className="cart-left">
        <h1 className="cart-title">
          Shopping Cart{" "}
          <span className="item-count">{getCartCount()} Items</span>
        </h1>

        <div className="cart-header">
          <p>Product Details</p>
          <p className="center-text">Subtotal</p>
          <p className="center-text">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div key={index} className="cart-item">
            <div className="item-info">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="product-image-wrapper"
              >
                <img
                  className="product-image"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="product-name">{product.name}</p>
                <div className="product-details">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="quantity-selector">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="center-text">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="remove-btn"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="remove-icon"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="continue-shopping"
        >
          <img src={assets.arrow_right_icon_colored} alt="arrow" />
          Continue Shopping
        </button>
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <hr />

        <div className="address-block">
          <p className="section-label">Delivery Address</p>
          <div className="address-info">
            <p>
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="change-btn"
            >
              Change
            </button>
            {showAddress && (
              <div className="address-dropdown">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="add-address"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="section-label">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="payment-select"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr />

        <div className="summary-details">
          <p>
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p>
            <span>Shipping Fee</span>
            <span className="free">Free</span>
          </p>
          <p>
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="total-amount">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button onClick={placeOrder} className="place-order-btn">
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
