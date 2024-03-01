import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        const rating = searchParams.get("rating");
        const sortBy = searchParams.get("sortBy");

        let url = `http://localhost:4000/api/products`;

        let isFirstParam = true;

        if (search) {
          url += `${isFirstParam ? "?" : "&"}search=${search}`;
          isFirstParam = false;
        }

        if (category) {
          url += `${isFirstParam ? "?" : "&"}category=${category}`;
          isFirstParam = false;
        }

        if (rating) {
          url += `${isFirstParam ? "?" : "&"}rating=${rating}`;
          isFirstParam = false;
        }

        if (sortBy) {
          url += `${isFirstParam ? "?" : "&"}sortBy=${sortBy}`;
          isFirstParam = false;
        } 
        
        const response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.data.message === "Invalid token.") {
          navigate("/login");
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [location.search]);

  return (
    <div>
      <div className="container text-center mt-5">
        <h1 className="mb-3" style={{ color: "black" }}>
          Products
        </h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard
                name={product.name}
                id={product.id}
                price={product.price}
                desc={product.desc}
                rating={product.rating}
                img={product.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
