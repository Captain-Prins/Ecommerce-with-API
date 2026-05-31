import {computeCartTotal} from "../../utilities/moneyCompute";
import dayjs from "dayjs";
export function OrderHeader({ order }) {
  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>
            {order ? dayjs(order.estimatedDeliveryTimeMs).format("MMMM D") : ""}
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
  );
}
