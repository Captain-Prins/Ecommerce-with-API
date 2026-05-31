import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { PaymentSummary } from "./PaymentSummary";
import {OrderSummary} from "./OrderSummary";
import axios from "axios";
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
        <OrderSummary cartItems={cartItems} deliveryOption={deliveryOption} />
        <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
