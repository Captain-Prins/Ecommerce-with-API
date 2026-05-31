import "./OrdersPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { OrderGrid } from "./OrderGrid";
export function OrdersPage({ cartItems }) {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const response = await axios.get("/api/orders?expand=products");
    const data = response.data;
    setOrders(data);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" href="/images/icons/orders-favicon.png" />
      <Header cartItems={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} />
      </div>
    </>
  );
}
