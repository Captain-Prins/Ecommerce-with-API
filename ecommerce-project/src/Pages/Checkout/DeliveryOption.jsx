import { computeCartTotal } from "../../utilities/moneyCompute";
import dayjs from "dayjs";
export function DeliveryOption({ cartItem, deliveryOption }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOption.map((option) => {
        let DeliveryPrice = "Free Shipping";

        if (option.priceCents > 0) {
          DeliveryPrice = `${computeCartTotal(option.priceCents)} - shipping fee`;
        }

        return (
          <div key={option.id} className="delivery-option">
            <input
              type="radio"
              defaultChecked={cartItem.deliveryOptionId === option.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${option.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
              </div>
              <div className="delivery-option-price">{DeliveryPrice}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
