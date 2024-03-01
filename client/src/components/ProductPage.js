import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Alert from "./Alert";

export default function ProductPage() {

const [product, setProduct] = useState('');
const [alert, setAlert] = useState(null);
const {id} = useParams();

  useEffect(() => {
    // Fetch product data from database
    async function getProduct() {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${id}`); // API endpoint
        setProduct(response.data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:4000/db/cart/add`, { productId: id }, {
        headers: {
          Authorization: token,
        },
      });
      console.log('Product added to cart:', response.data);
      showAlert("Successfully added to your shopping cart!");
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const showAlert = (message) => {
    setAlert({msg: message});
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit" src={product.image} alt={product.name} />
            </div>
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
              {product.name}
              </h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <span className="ms-1">
                  {product.avgRating}⭐
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <span className="h5">${product.price}</span>
              </div>
              <p>
                {product.description}
              </p>
              <hr />
              <button onClick={handleAddToCart} className="btn btn-primary shadow-0">
                Add to Cart
              </button>
            </div>
          </main>
        </div>
      </div>
      <Alert alert = {alert} />
    </section>
  )
}
