import "./TrackingPage.css";
import axios from "axios";
import dayjs from 'dayjs';
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { useEffect, useState } from "react";
export function TrackingPage({ cartItems }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  async function ordering() {
    const response = await axios.get(`/api/orders/${orderId}?expand=products`);
    const data = response.data;
    setOrder(data);
  }
  useEffect(() => {
    ordering();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  const orderProduct = order.products.find(
    (product) => product.productId === productId,
  );

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercent = Math.min(
    (timePassedMs / totalDeliveryTimeMs) * 100,
    100,
  );
  return (
    <>
      <title>Tracking Page</title>
      <link rel="icon" href="/images/icons/tracking-favicon.png" />
      <Header cartItems={cartItems} />
      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/order">
            View all orders
          </a>

          <div className="delivery-date">Arriving on Monday, June 13</div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">Quantity: 1</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${deliveryPercent}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
