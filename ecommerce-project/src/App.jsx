import { useState, useEffect } from "react";
import { Homepage } from "./Pages/Home/Homepage";
import { CheckoutPage } from "./Pages/Checkout/CheckoutPage";
import { OrdersPage } from "./Pages/Order/OrdersPage";
import { TrackingPage } from "./Pages/Tracking/TrackingPage";
import { NotFound } from "./Pages/Tracking/NotFound";
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
      <Route index element={<Homepage cartItems={cartItems} fetchCartItems={fetchCartItems}/>} />
      <Route path="checkout" element={<CheckoutPage cartItems={cartItems}  fetchCartItems={fetchCartItems}/>} />
      <Route path="order" element={<OrdersPage cartItems={cartItems}  />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cartItems={cartItems} />} />
      <Route path="*" element={<NotFound cartItems={cartItems} />} />
    </Routes>
  );
}

export default App;
