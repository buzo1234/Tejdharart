import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cat, setCat] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(false);

  let foundProduct;
  let index;

  function check(cart, pro, prod) {
    if (cart.length === 0) {
      return false;
    } else {
      for (let i = 0; i < cart.length; i++) {
        console.log('got cart ', cart[i]);
        if (
          cart[i].colorVariant === pro ||
          (cart[i].colorVariant === null && pro === null)
        ) {
          console.log('enter', cart[i]?.id_main);
          if (cart[i].id_main === prod._id + pro) {
            console.log('same id and color', cart[i].id_main, prod._id + pro);
            return true;
          }
        }
      }
      return false;
    }
  }

  const onAdd = (product, color, quantity) => {
    console.log('pp', product);
    const checkProductInCart = check(cartItems, color, product);
    console.log('flag', checkProductInCart); /* cartItems.find(
      (item) =>
        item._id === product._id && item.colorVariant === product.colorVariant
    ); */

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.defaultPrice * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      console.log('Entered', cartItems);
      const updatedCartItems = cartItems.map((cartProduct) => {
        console.log('cart items', cartProduct);
        if (cartProduct.id_main === product._id + color) {
          console.log('entered in changin loop');
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });
      console.log('Exited', updatedCartItems);

      setCartItems(updatedCartItems);
    } else {
      console.log('got color : ', color);
      let productclone = Object.assign({}, product);
      productclone.quantity = quantity;
      productclone.colorVariant = color;
      productclone.id_main = product._id + color;
      setCartItems([...cartItems, { ...productclone }]);
    }

    t.successtoas(`${qty} ${product.title} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id_main === product.id_main);
    console.log('found ', foundProduct);
    const newCartItems = cartItems.filter(
      (item) => item.id_main !== product.id_main
    );

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.defaultPrice * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const logAllCategories = (catdata) => {
    setCat(catdata);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item.id_main === id);
    index = cartItems.findIndex((product) => product.id_main === id);
    const newCartItems = cartItems.filter((item) => item.id_main !== id);

    if (value === 'inc') {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundProduct.defaultPrice
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - foundProduct.defaultPrice
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        active,
        cat,
        setCat,
        logAllCategories,
        setActive,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
