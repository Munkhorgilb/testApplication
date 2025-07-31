import { IOrder, IProduct, IUser } from '#/utils/state/schema';
import React, { createContext, useContext, useState } from 'react';
import * as persisted from '#/utils/state';

type AppContextType = {
  users: IUser[];
  setUsers: (v: IUser[]) => void;
  products: IProduct[];
  setProducts: (v: IProduct[]) => void;
  orders: IOrder[];
  setOrders: (v: IOrder[]) => void;
};

const AppContext = createContext<AppContextType>({
  products: [],
  setProducts: () => {},
  orders: [],
  setOrders: () => {},
  users: [],
  setUsers: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState(persisted.get('products') || []);
  const [orders, setOrders] = useState(persisted.get('orders') || []);
  const [users, setUsers] = useState(persisted.get('users') || []);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers: updatedItems => {
          setUsers(updatedItems);
          persisted.write('users', updatedItems);
        },
        products,
        setProducts: updatedItems => {
          setProducts(updatedItems);
          persisted.write('products', updatedItems);
        },
        orders,
        setOrders: updatedItems => {
          setOrders(updatedItems);
          persisted.write('orders', updatedItems);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
