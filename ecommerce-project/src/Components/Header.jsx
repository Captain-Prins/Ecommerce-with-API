import "./header.css";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";
export function Header({ cartItems }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
  });
  function handleSearch() {
    navigate(`/?search=${searchParams.get("query") || ""}`);
  }
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchParams.get("query") || ""}
            onChange={(e) => setSearchParams({ query: e.target.value })}
            onClick={() => {
              console.log("Search bar clicked");
            }}
          />

          <button className="search-button" onClick={handleSearch}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive
                ? "orders-link header-link active"
                : "orders-link header-link"
            }
          >
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
