/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../css/MyOrder.css";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>
      <div className="orders-list">
        {myOrders.map((order) => (
          <div key={order._id} className="order-card">
            <p className="order-id">OrderId : {order._id}</p>

            <div className="order-main">
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item._id || item.product._id} className="item">
                    <img
                      src={item.product.image?.[0] || boxIcon}
                      alt="Product"
                      className="item-icon"
                    />
                    <div>
                      <p className="item-name">
                        {item.product.name}
                        <span
                          className={`item-quantity ${
                            item.quantity < 1 ? "hidden" : ""
                          }`}
                        >
                          x {item.quantity}
                        </span>
                      </p>
                      <p className="item-category">
                        Category: {item.product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-address">
                <p className="address-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="address-details">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
              </div>

              <div>
                <p className="order-amount">
                  Total Amount: {currency}
                  {order.totalAmount || order.amount}
                </p>
                <p className="order-amount-green">
                  Amount: {currency}
                  {order.amount}
                </p>
              </div>

              <div className="order-meta">
                <p>Payment: {order.paymentType}</p>
                <p>Status: Order Placed</p>
                <p>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
