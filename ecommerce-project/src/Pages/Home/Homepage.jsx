import "./Homepage.css";
import { Header } from "../../Components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useEffect, useState } from "react";
import axios from "axios";


export function Homepage({cartItems}) {
  const [products, setProducts] = useState([]);
  
  async function fetchProducts() {
    const response = await axios.get("/api/products");
    const data = response.data;
    setProducts(data);
  }


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <link rel="icon" href="/images/icons/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cartItems={cartItems} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
