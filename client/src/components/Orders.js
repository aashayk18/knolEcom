import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchOrderItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/orders/fetch", {
          headers: {
            Authorization: token,
          },
        });
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    const fetchOrderProducts = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        ); // API endpoint
        return response.data;
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    const fetchAllOrderProducts = async () => {
      try {
        const productPromises = orderItems.map(fetchOrderProducts);
        const products = await Promise.all(productPromises);
        setOrderProducts(products);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchOrderItems();
    fetchAllOrderProducts();
  }, [orderItems]);

  return (
    <div className="container">
    <br />
      <h1 className="mb-4">Orders</h1>
      <div className="row">
        <div className="col-md-8">
          { orderProducts.length > 0 ?
            (orderProducts.map((item, index) => (
            <OrderItem
              key={index}
              name={item.name}
              price={item.price}
              image={item.image}
              id={item.id}
            />
          ))
          ) : (
            <>
            <h5>You have no previous orders!</h5>
            <br />
            <h7>Once you complete any purchases, they will be displayed here.</h7>
            </>
          )
        }
        </div>
        <div className="col-md-4">
          <Link to="/" className="btn btn-secondary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
