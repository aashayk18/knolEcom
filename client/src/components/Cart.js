import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/db/cart", {
          headers: {
            Authorization: token,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchCartProducts = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        ); // API endpoint
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchAllCartProducts = async () => {
      try {
        const productPromises = cartItems.map(fetchCartProducts);
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartItems();
    fetchAllCartProducts();
  }, [cartItems]);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/orders/place", cartItems, {
        headers: {
          Authorization: token,
        },
      });

      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container" style={{height: "100vh"}}>
    <br />
      <h1 className="mb-4">Cart 🛒</h1>
      <div className="row">
        <div className="col-md-8">
          {cartProducts.length > 0 ? (
            cartProducts.map((item, index) => (
              <CartItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))
          ) : (
            <>
              <br />
              <h5>Cart is empty!</h5>

              <h7>Add some items to the cart to see them here.</h7>
            </>
          )}
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total:</h5>
              <p className="card-text">
                $ {cartProducts.reduce((total, item) => total + item.price, 0)}
              </p>
            </div>
          </div>
          <Link to="/" className="btn btn-secondary me-2">
            Back
          </Link>
          <button
            onClick={() => {
              placeOrder();
              alert('Your order has been placed!');
              navigate("/orders")
            }}
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
