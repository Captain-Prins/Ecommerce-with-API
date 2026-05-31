import {Header} from "../Components/Header";
import './NotFound.css';
export function NotFound({ cartItems }) {
  return (
    <>
     <Header cartItems={cartItems} />
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
    </>

  );
}