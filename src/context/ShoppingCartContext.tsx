import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Cart } from "../pages/Cart";

type ShoppingCartProviderProps = {
    children: ReactNode;
};

export type CartItemProps = {
    id: number;
    quantity: number;
};

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItemProps[];
};

// cart 관련 전역으로 관리할 상태들 모음
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>(
        "cart-item",
        []
    );
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );
    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function increaseItemQuantity(id: number) {
        setCartItems((curItems) => {
            // 상품이 카드에 없는 경우 새로 넣어주기
            if (curItems.find((item) => item.id === id) == null) {
                return [...curItems, { id, quantity: 1 }];
            } else {
                // 상품이 카트에 있는 경우 개수만 1 증가
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        // 어떤 경우도 아니라면 그대로 리턴
                        return item;
                    }
                });
            }
        });
        localStorage.setItem("CART_ITEM", JSON.stringify(cartItems));
    }

    function decreaseItemQuantity(id: number) {
        setCartItems((curItems) => {
            // 상품이 카드에 1개 있으면 제거
            if (curItems.find((item) => item.id === id)?.quantity === 0) {
                return curItems.filter((item) => item.id !== id);
            } else {
                // 상품이 카트에 있는 경우 개수만 1 증가
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        // 어떤 경우도 아니라면 그대로 리턴
                        return item;
                    }
                });
            }
        });
        localStorage.setItem("CART_ITEM", JSON.stringify(cartItems));
    }

    function removeFromCart(id: number) {
        setCartItems((curItems) => {
            return curItems.filter((item) => item.id !== id);
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseItemQuantity,
                decreaseItemQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
