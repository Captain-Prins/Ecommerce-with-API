import { useState, useEffect } from "react";
import { Homepage } from "./Pages/Home/Homepage";
import { CheckoutPage } from "./Pages/Checkout/CheckoutPage";
import { OrdersPage } from "./Pages/OrdersPage";
import { TrackingPage } from "./Pages/TrackingPage";
import { NotFound } from "./Pages/NotFound";
import { Routes, Route } from "react-router";
import axios from "axios";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  
  async function fetchCartItems() {
    const response = await axios.get("/api/cart-items?expand=product");
    const data = response.data;
    setCartItems(data);
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Routes>
      <Route index element={<Homepage cartItems={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
      <Route path="order" element={<OrdersPage cartItems={cartItems}  />} />
      <Route path="tracking" element={<TrackingPage cartItems={cartItems} />} />
      <Route path="*" element={<NotFound cartItems={cartItems} />} />
    </Routes>
  );
}

export default App;
