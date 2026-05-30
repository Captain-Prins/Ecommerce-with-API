import "./OrdersPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { computeCartTotal } from "../utilities/moneyCompute";
import { useEffect, useState, Fragment } from "react";
import { Header } from "../Components/Header";
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

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {order
                          ? dayjs(order.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{computeCartTotal(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order ? order.id : " "}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((OrderProduct) => {
                    return (
                      <Fragment key={OrderProduct.productId}>
                        <div className="product-image-container">
                          <img src={OrderProduct ? OrderProduct.product.image : ""} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {OrderProduct ? OrderProduct.product.name : ""}
                          </div>
                          <div className="product-delivery-date">
                            {OrderProduct ? `Arriving on: ${dayjs(OrderProduct.estimatedDeliveryTimeMs).format("MMMM D")}` : ""}
                          </div>
                          <div className="product-quantity">Quantity: {OrderProduct ? OrderProduct.quantity : 1}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
