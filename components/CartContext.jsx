
const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window!=="undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if(cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if(ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [])
  
  function addProduct(productId, amountNew, price) {
    const indexOfProduct = cartProducts.findIndex(p => p.productId === productId);
    // const indexOfProduct = cartProducts.map(e => e.productId).indexOf(productId);


    if(indexOfProduct > -1) {
      const amount = cartProducts[indexOfProduct].amount;
      
      const allAmount = (amount - 0) + (amountNew - 0);

      if(allAmount > 0) {

        setCartProducts(prev => {
          const newCartProducts = [...prev];
          newCartProducts[indexOfProduct] = {productId, amount: allAmount, price};
          return newCartProducts;
        })

        // removeProduct(productId);
        // setCartProducts(prev => [...prev, {productId, amount: allAmount, price}]);
      }
      else{
        removeProduct(productId);
      }

    }
    else {
      setCartProducts(prev => [...prev, {productId, amount: amountNew, price}]);
    }
  }
  
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = cartProducts.map(e => e.productId).indexOf(productId);
      if(pos!== -1) {
          return prev.filter((value, index) => index!== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  return(
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
      {children}
    </CartContext.Provider>
  );

}