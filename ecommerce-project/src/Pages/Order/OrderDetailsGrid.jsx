import {Fragment} from "react";
import dayjs from "dayjs";
export function OrderDetailsGrid({ order }) {
  return (
    <div className="order-details-grid">
      {order.products.map((OrderProduct) => {
        return (
          <Fragment key={OrderProduct.productId}>
            <div className="product-image-container">
              <img src={OrderProduct ? OrderProduct.product.image : ""} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {OrderProduct ? OrderProduct.product.name : ""}
              </div>
              <div className="product-delivery-date">
                {OrderProduct
                  ? `Arriving on: ${dayjs(OrderProduct.estimatedDeliveryTimeMs).format("MMMM D")}`
                  : ""}
              </div>
              <div className="product-quantity">
                Quantity: {OrderProduct ? OrderProduct.quantity : 1}
              </div>
              <button className="buy-again-button button-primary">
                <img
                  className="buy-again-icon"
                  src="images/icons/buy-again.png"
                />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
                <a href={`/tracking/${order.id}/${OrderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
