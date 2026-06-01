import {DeliveryDate} from "./DeliveryDate";
import {CartItemDetails} from "./CartItemDetails";
import { DeliveryOption } from "./DeliveryOption";
export function OrderSummary({ cartItems, deliveryOption, fetchCartItems }) {
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

                <CartItemDetails item={item} fetchCartItems={fetchCartItems} />
                <DeliveryOption cartItem={item} deliveryOption={deliveryOption} fetchCartItems={fetchCartItems} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
