import { defaults, ICartItem, IProduct, IUser } from '#/utils/state/schema';
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as persisted from '#/utils/state';
import { v4 as uuidv4 } from 'uuid';

type AuthContextType = {
  user: IUser | null;
  login: (email: string, password: string) => string;
  register: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => string;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  cartItems: ICartItem[];
  setCartItems: (v: ICartItem[]) => void;
  wishlistItems: IProduct[];
  setWishlistItems: (v: IProduct[]) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => '',
  register: () => '',
  logout: () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
  cartItems: [],
  setCartItems: () => {},
  wishlistItems: [],
  setWishlistItems: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [cartItems, setCartItems] = useState(
    persisted.get('currentUser')?.cart || [],
  );
  const [wishlistItems, setWishlistItems] = useState(
    persisted.get('currentUser')?.wishlist || [],
  );

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = persisted.get('currentUser');
      if (storedUser) {
        setUser(storedUser);
      }
    };
    checkAuth();
  }, []);

  const login = (email: string, password: string) => {
    const users = persisted.get('users') || defaults.users;

    const foundUser = users.find(
      (u: IUser) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );
    if (foundUser) {
      setUser(foundUser);
      persisted.write('currentUser', foundUser);
      return 'success';
    } else {
      return 'error';
    }
  };

  const register = ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const users = persisted.get('users') || defaults.users;
    const normalizedEmail = email?.trim().toLowerCase();

    const existingUser = users.find(
      (u: IUser) => u.email?.trim().toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      return 'user_exists';
    }
    const newUser: IUser = {
      id: uuidv4(),
      name,
      email,
      password,
      isAdmin: false,
      cart: [],
      wishlist: [],
    };
    users.push(newUser);
    persisted.write('users', users);
    setUser(newUser);
    persisted.write('currentUser', newUser);
    return 'success';
  };

  const logout = () => {
    setUser(null);
    persisted.write('currentUser', undefined);
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => !!user?.isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        cartItems,
        setCartItems: updatedItems => {
          setCartItems(updatedItems);
          if (user) {
            persisted.write('currentUser', {
              ...user,
              cart: updatedItems,
            });
          }
        },
        wishlistItems,
        setWishlistItems: updatedItems => {
          setWishlistItems(updatedItems);
          if (user) {
            persisted.write('currentUser', {
              ...user,
              wishlist: updatedItems,
            });
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
