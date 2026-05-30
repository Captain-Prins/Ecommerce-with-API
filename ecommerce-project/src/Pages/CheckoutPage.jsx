import "./CheckoutPage.css";
import { CheckoutHeader } from "./Checkout/CheckoutHeader";
import { computeCartTotal } from "../utilities/moneyCompute";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export function CheckoutPage({ cartItems }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  async function fetchDeliveryOptions() {
    const response = await axios.get(
      "/api/delivery-options?expand=estimatedDeliveryTime",
    );
    const data = response.data;
    setDeliveryOption(data);
  }
  async function payments() {
    const response = await axios.get("/api/payment-summary");
    const data = response.data;
    setPaymentSummary(data);
  }
  useEffect(() => {
    fetchDeliveryOptions();
    payments();
  }, []);

  return (
    <>
      <link rel="icon" href="/images/icons/cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOption.length > 0 &&
              cartItems.map((item) => {
                const selectedItemDelivery = deliveryOption.find(
                  (option) => option.id === item.deliveryOptionId,
                );

                return (
                  <div key={item.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:
                      {selectedItemDelivery
                        ? dayjs(
                            selectedItemDelivery.estimatedDeliveryTimeMs,
                          ).format("dddd, MMMM D")
                        : "Not available"}
                    </div>

                    <div className="cart-item-details-grid">
                      <img className="product-image" src={item.product.image} />

                      <div className="cart-item-details">
                        <div className="product-name">{item.product.name}</div>
                        <div className="product-price">
                          {computeCartTotal(item.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {item.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOption.map((option) => {
                          let DeliveryPrice = "Free Shipping";

                          if (option.priceCents > 0) {
                            DeliveryPrice = `${computeCartTotal(option.priceCents)} - shipping fee`;
                          }

                          return (
                            <div key={option.id} className="delivery-option">
                              <input
                                type="radio"
                                defaultChecked={
                                  deliveryOption.id === option.deliveryOptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${option.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(option.estimatedDeliveryTimeMs).format(
                                    "dddd, MMMM D",
                                  )}
                                </div>
                                <div className="delivery-option-price">
                                  {DeliveryPrice}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {paymentSummary && (
            <>
              <div className="payment-summary">
                <div className="payment-summary-title">Payment Summary</div>

                <div className="payment-summary-row">
                  <div>Items ({paymentSummary?.totalItems || 0}):</div>
                  <div className="payment-summary-money">
                    {paymentSummary
                      ? `$${computeCartTotal(paymentSummary.productCostCents)}`
                      : "$0.00"}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {paymentSummary
                      ? `$${computeCartTotal(paymentSummary.shippingCostCents)}`
                      : "$0.00"}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {paymentSummary
                      ? `$${computeCartTotal(paymentSummary.totalCostBeforeTaxCents)}`
                      : "$0.00"}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {paymentSummary
                      ? `$${computeCartTotal(paymentSummary.taxCents)}`
                      : "$0.00"}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {paymentSummary
                      ? `$${computeCartTotal(paymentSummary.totalCostCents)}`
                      : "$0.00"}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
