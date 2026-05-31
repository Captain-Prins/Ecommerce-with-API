import {DeliveryDate} from "./DeliveryDate";
import {CartItemDetails} from "./CartItemDetails";
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
             
              < DeliveryDate selectedItemDelivery={selectedItemDelivery} />
              <div className="cart-item-details-grid">

                <CartItemDetails item={item} />
                <DeliveryOption cartItem={item} deliveryOption={deliveryOption}  />
              </div>
            </div>
          );
        })}
    </div>
  );
}
