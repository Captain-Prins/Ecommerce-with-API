import "./Homepage.css";
import { Header } from "../../Components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";


export function Homepage({cartItems ,fetchCartItems}) {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  const search = searchParams.get("query") || "";


  async function fetchProducts() {
    const url = search ? `/api/products?search=${search}` : "/api/products";

    try {
      const respone = await axios.get(url);
      setProducts(respone.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <>
      <link rel="icon" href="/images/icons/home-favicon.png" />
      <title>Ecommerce Project</title>

      <Header cartItems={cartItems} />
      <div className="home-page">
        <ProductsGrid products={products} fetchCartItems={fetchCartItems} />
      </div>
    </>
  );
}
