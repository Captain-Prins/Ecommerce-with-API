import { useState, useEffect } from "react";
import { Homepage } from "./Pages/Homepage";
import { CheckoutPage } from "./Pages/CheckoutPage";
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
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
