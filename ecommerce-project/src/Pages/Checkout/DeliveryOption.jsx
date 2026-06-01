import { computeCartTotal } from "../../utilities/moneyCompute";
import dayjs from "dayjs";
import axios from "axios";
export function DeliveryOption({ cartItem, deliveryOption, fetchCartItems }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOption.map((option) => {
        let DeliveryPrice = "Free Shipping";

        if (option.priceCents > 0) {
          DeliveryPrice = `${computeCartTotal(option.priceCents)} - shipping fee`;
        }

        async function handleDeliveryOptionChange() {
          try {
            const response = await axios.put(
              `/api/cart-items/${cartItem.productId}`,
              {
                deliveryOptionId: option.id,
              },
            );
          } catch (error) {
            console.error(error.response?.data);
          }
          fetchCartItems();
        }

        return (
          <div
            key={option.id}
            className="delivery-option"
            onClick={() => {
              handleDeliveryOptionChange();
            }}
          >
            <input
              type="radio"
             checked={cartItem.deliveryOptionId === option.id}
             onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
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
