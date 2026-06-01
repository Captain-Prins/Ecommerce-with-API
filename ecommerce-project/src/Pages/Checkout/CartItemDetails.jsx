import { computeCartTotal } from "../../utilities/moneyCompute";
import axios from "axios";
export function CartItemDetails({ item, fetchCartItems }) {
  async function DeleteCartItem(productId) {
    try {
      const response = await axios.delete(`/api/cart-items/${productId}`);
    } catch (error) {
      console.error(error.response?.data);
    }

    fetchCartItems();
  }
  return (
    <>
      <img className="product-image" src={item.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{item.product.name}</div>
        <div className="product-price">
          {computeCartTotal(item.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <span className="quantity-label">{item.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">Update</span>
          <span
            className="delete-quantity-link link-primary"
            onClick={() => {
              DeleteCartItem(item.productId);
            }}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
