import { computeCartTotal } from "../../utilities/moneyCompute";
import axios from "axios";
import { useState } from "react";
export function CartItemDetails({ item, fetchCartItems }) {
  const [quantityUpdate, setQuantityUpdate] = useState(item.quantity);
  const [isEditing, setisEditing] = useState(false);

  async function DeleteCartItem(productId) {
    try {
      const response = await axios.delete(`/api/cart-items/${productId}`);

      fetchCartItems();
    } catch (error) {
      console.error(error.response?.data);
    }
  }

  async function UpdateCartItem(productId, quantity) {
    try {
      await axios.put(`/api/cart-items/${productId}`, {
        quantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error(error.response?.data);
    }
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
            Quantity:
            <input
              type="text"
              className="quantity-input"
              defaultValue={quantityUpdate}
              onChange={(e) => setQuantityUpdate(parseInt(e.target.value))}
               onKeyDown ={(e) => {
                if (e.key === "Enter") {
                  UpdateCartItem(item.productId, quantityUpdate);
                  setisEditing(false);
                }
                
                if (e.key === "Escape") {
                  setQuantityUpdate(item.quantity);
                  setisEditing(false);
                }
               }}
              style={{ display: isEditing ? "inline-block" : "none" }}
            />
            <span className="quantity-label">{!isEditing && item.quantity}</span>
            {/* {!isEditing && <span className="quantity-label">{item.quantity}</span>} */}
          </span>
          <span
            className="update-quantity-link link-primary" 
            onClick={() => {
              if (!isEditing) {
                setisEditing(true);
              } else {
                UpdateCartItem(item.productId, quantityUpdate);
                setisEditing(false);
              }
            }}
          >
            {isEditing ? "Save" : "Update"}
          </span>
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
