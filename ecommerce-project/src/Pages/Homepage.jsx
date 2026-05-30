import "./Homepage.css";
import { Header } from "../Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
export function Homepage() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  async function fetchProducts() {
    const response = await axios.get("http://localhost:3000/api/products");
    const data = response.data;
    setProducts(data);
  }

  async function fetchCartItems() {
    const response = await axios.get("http://localhost:3000/api/cart-items");
    const data = response.data;
    setCartItems(data);
   
  }
  useEffect(() => {
    fetchProducts();
    fetchCartItems();
  }, []);

  return (
    <>
      <link rel="icon" href="/images/icons/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cartItems={cartItems} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((item) => {
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
                  ${(item.priceCents / 100).toFixed(2)}
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

                <button className="add-to-cart-button button-primary">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
