import React, { createContext, useState } from 'react';

type CartType = {
  [key: number]: number;
};

type CartContextType = {
  cart: CartType;
  setCart: React.Dispatch<React.SetStateAction<CartType>>;
};

export const CartContext = createContext<CartContextType>({
  cart: {},
  setCart: () => {},
});

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartType>({});

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
