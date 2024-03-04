import React from "react";
import "../styles/ProductCard.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function ProductCard(props) {
  const maxDescLength = 50;
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="product-card">
    <div className="product-whole">
    <div className="product-details">
    <Link to={`/products/${props.id}`}>
      <img
        src={props.img}
        className="product-image"
        alt={props.key}
      />
      </Link>
      <div className="name-price">
        <h2 className="product-name">{props.name}</h2>
        <p className="product-price">${props.price}</p>
        <p className="product-rating">{props.rating}⭐</p>
        </div>
        </div>
        <p className="product-description" style={{ color: theme === "dark" ? "white" : "black" }}>
          {props.desc.length > maxDescLength
            ? props.desc.slice(0, maxDescLength) + "..."
            : props.desc}
        </p>
      </div>
    </div>
  );
}
