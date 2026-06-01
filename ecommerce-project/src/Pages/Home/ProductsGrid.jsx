import axios from "axios";
import { computeCartTotal } from "../../utilities/moneyCompute";
import { useEffect } from "react";
export function ProductsGrid({ products,fetchCartItems }) {
  async function addCartItem(productId) {
  try {
    const response = await axios.post("/api/cart-items", {
       productId: productId,
      quantity: 1,
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="products-grid">
      {products.map((item) => {
        const 
        return (
          <div className="product-container" key={item.id}>
            <div className="product-image-container">
              <img className="product-image" src={item.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
              {item.name}
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src={`images/ratings/rating-${item.rating.stars * 10}.png`}
              />
              <div className="product-rating-count link-primary">
                {item.rating.count}
              </div>
            </div>

            <div className="product-price">
              {computeCartTotal(item.priceCents)}
            </div>

            <div className="product-quantity-container">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button
              className="add-to-cart-button button-primary"   onClick={() => {addCartItem(item.id); fetchCartItems()}}>
              Add to Carts
            </button>
          </div>
        );
      })}
    </div>
  );
}
