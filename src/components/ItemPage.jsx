import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import "../css/ItemPage.css";
import Item from "./Item";

const apiURL = "https://fakestoreapi.com/products";

const ItemPage = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = () => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.log("There was an error fetching the products", error)
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <input
        className="searchInput"
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="ItemPage-items">
        {products.filter(product=> product.title.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
          <li key={product.id} className="ItemPage-item">
            <Item item={product} onAddToCart={() => onAddToCart(product)}>
              <button
                className="Item-addToCart"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </Item>
          </li>
        ))}
      </ul>
    </>
  );
};

ItemPage.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ItemPage;
