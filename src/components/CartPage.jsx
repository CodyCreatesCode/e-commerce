import { PropTypes } from "prop-types";
import '../css/CartPage.css';
import Item from "./Item";

const CartPage = ({items, onAddOne, onRemoveOne, total}) => {

  return (
    <>
      <h1>My Cart</h1>
      <ul className="CartPage-items">
        {items.map(item => (
          <li key={item.id} className="CartPage-item">
            <Item item={item} onAddOne={onAddOne} onRemoveOne={onRemoveOne}/>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </>
  );

} 

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired,
};

export default CartPage;