import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ProductPage from "./components/ProductPage";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
// import { useTheme } from "./contexts/ThemeContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      if (expirationTime < Date.now()) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route
                path="/"
                exact
                element={authenticated ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/cart"
                element={authenticated ? <Cart /> : <Navigate to="/login" />}
              /> 
              <Route
                path="/orders"
                element={authenticated ? <Orders /> : <Navigate to="/login" />}
              />
              <Route
                path="/products/:id"
                element={
                  authenticated ? <ProductPage /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
