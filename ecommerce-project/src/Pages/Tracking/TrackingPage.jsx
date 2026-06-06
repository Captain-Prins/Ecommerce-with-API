import "./TrackingPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { useEffect, useState } from "react";

export function TrackingPage({ cartItems }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;
  async function ordering() {
    const response = await axios.get(`/api/orders/${orderId}?expand=products`);
    const data = response.data;
    setOrder(data);
    console.log(data);
  }
  useEffect(() => {
    ordering();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  const orderProduct = order.products.find(
    (prod) => prod.productId === productId,
  );

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryPercent = Math.min(
    (timePassedMs / totalDeliveryTimeMs) * 0.3,
    100,
  );

  if (deliveryPercent < 33) {
    isPreparing = true;
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    isShipped = true;
  } else if (deliveryPercent === 100) {
    isDelivered = true;
  }

  const deliveryDate = dayjs(orderProduct.estimatedDeliveryTimeMs).format(
    "MMMM D, YYYY",
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

          <div className="delivery-date">
            {deliveryPercent >= 100
              ? `Delivered on ${deliveryDate}`
              : `Arriving on ${deliveryDate}`}
          </div>

          <div className="product-info">
            {orderProduct ? orderProduct.product.name : "Product Name"}
          </div>

          <div className="product-info">Quantity: {orderProduct ? orderProduct.quantity : 1}</div>

          <img
            className="product-image"
            src={orderProduct ? orderProduct.product.image : ""}
          />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && "current-status"}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && "current-status"}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && "current-status"}`}
            >
              Delivered
            </div>
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
