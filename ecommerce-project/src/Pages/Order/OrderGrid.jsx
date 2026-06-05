import {OrderHeader} from "./OrderHeader";
import {OrderDetailsGrid} from "./OrderDetailsGrid";
export function OrderGrid({orders, fetchCartItems}) {
  return (
    <div key={orders.id} className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
             <OrderHeader order={order} />
                <OrderDetailsGrid order={order} fetchCartItems={fetchCartItems} />
          </div>
        );
      })}

    </div>
  );
}
