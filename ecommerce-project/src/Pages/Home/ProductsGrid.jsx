import axios from "axios";
import { Products } from "./Products";
export function ProductsGrid({ products, fetchCartItems }) {


  return (
    <div className="products-grid">
      {products.map((item) => {
        return (

            <Products
              key={item.id}
              item={item}
              fetchCartItems={fetchCartItems}
            />
         
        );
      })}
    </div>
  );
}
