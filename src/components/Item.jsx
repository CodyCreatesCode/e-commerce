import { PropTypes } from "prop-types";
import "../css/Item.css";

const Item = ({ item, children, onAddOne, onRemoveOne }) => {
  return (
    <>
      <div className="Item">
        <div className="Item-left">
          <div className="Item-image"><img src={item.image} alt={item.title} style={{width: '70px', height: '70px'}} /></div>
          <div className="Item-title">{item.title}</div>
          <div className="Item-description">{item.description}</div>
        </div>

        <div className="Item-right">
          <div className="Item-price">${item.price}</div>
          {item.count && (
            <div className="quantity-container">
              <button
                onClick={() => onRemoveOne(item)}
                className="CartItem-removeOne"
              >
                -
              </button>
              <div className="CartItem-count">{item.count}</div>
              <button
                onClick={() => onAddOne(item)}
                className="CartItem-removeOne"
              >
                +
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
