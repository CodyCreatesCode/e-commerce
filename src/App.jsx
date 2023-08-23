import React, { useEffect } from "react";
import { useState } from "react";
import "./css/App.css";
import Nav from "./components/Nav";
import ItemPage from "./components/ItemPage";
import { items } from "./static-data";
import CartPage from "./components/CartPage";

const summarizeCart = (cart) => {
  const groupItems = cart.reduce((summary, item) => {
    summary[item.id] = summary[item.id] || {
      ...item,
      count: 0
    }
    summary[item.id].count++;
    return summary;
  }, {});
  return Object.values(groupItems);
}

const App = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCart([...cart, item])
    setTotal(prevTotal => prevTotal + item.price)
  }

  const addItem = (item) => {
    setTotal(prevTotal => prevTotal + item.price)
    let currentCart = summarizeCart(cart)
    let index = currentCart.findIndex(i => i.id === item.id);
    if (index >= 0) {
      currentCart[index].count += 1;
    } else {
      currentCart.push({...item, count: 1});
    }

    const updatedCart = [];
    currentCart.forEach(item => {
      for (let i = 0; i < item.count; i++) {
        updatedCart.push(item);
      }
    })
    setCart(updatedCart)
  }

  const removeItem = (item) => {
    setTotal(prevTotal => prevTotal - item.price)
    let index = cart.findIndex(i => i.id === item.id);
    if (index >= 0) {
      setCart(cart => {
        const copy = [...cart];
        copy.splice(index, 1);
        return copy;
      });
    }
  }

  return (
    <>
      <div className="App">
        <Nav
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="App-content">
          <Content
            tab={activeTab}
            total={total}
            onAddToCart={addToCart}
            cart={summarizeCart(cart)}
            onRemoveItem={removeItem}
            onAddItem={addItem}
          />
        </main>
      </div>
    </>
  );
};

const Content = ({tab, onAddToCart, cart, onRemoveItem, onAddItem, total, api}) => {
  switch (tab) {
    case 'items' : 
      return <ItemPage items={items} onAddToCart={onAddToCart} />;
    case 'cart':
      return <CartPage items={cart} onRemoveOne={onRemoveItem} onAddOne={onAddItem} total={total}/>;
      default:
        break;
  }
};

export default App;
