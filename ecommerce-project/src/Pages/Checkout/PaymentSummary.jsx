import { computeCartTotal } from "../../utilities/moneyCompute";
import axios from "axios";
import { useNavigate } from "react-router";
export function PaymentSummary({ paymentSummary, fetchCartItems }) {
  
  const navigate = useNavigate();
  
  
  async function placeOrder() {
    try {
      const response = await axios.post("/api/orders");
    } catch (error) {
      console.error(error.response?.data);
    }
    fetchCartItems();
    navigate("/order");
  }

  return (
    <>
      {paymentSummary && (
        <div className="payment-summary">
          <div className="payment-summary-title">Payment Summary</div>

          <div className="payment-summary-row">
            <div>Items ({paymentSummary?.totalItems || 0}):</div>
            <div className="payment-summary-money">
              {paymentSummary
                ? `${computeCartTotal(paymentSummary.productCostCents)}`
                : "$0.00"}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {paymentSummary
                ? `${computeCartTotal(paymentSummary.shippingCostCents)}`
                : "$0.00"}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {paymentSummary
                ? `${computeCartTotal(paymentSummary.totalCostBeforeTaxCents)}`
                : "$0.00"}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {paymentSummary
                ? `${computeCartTotal(paymentSummary.taxCents)}`
                : "$0.00"}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {paymentSummary
                ? `${computeCartTotal(paymentSummary.totalCostCents)}`
                : "$0.00"}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={() => {
              placeOrder();
            }}
          >
            Place your order
          </button>
        </div>
      )}
    </>
  );
}
