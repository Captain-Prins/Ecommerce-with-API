import dayjs from "dayjs";
import { computeCartTotal } from "../../utilities/moneyCompute";
import { DeliveryOption } from "./DeliveryOption";
export function OrderSummary({ cartItems, deliveryOption }) {
  return (
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
                  ? dayjs(selectedItemDelivery.estimatedDeliveryTimeMs).format(
                      "dddd, MMMM D",
                    )
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
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOption cartItem={item} deliveryOption={deliveryOption}  />
              </div>
            </div>
          );
        })}
    </div>
  );
}
