import { atom, selector } from "recoil";

// CartInfo
type CartItem = {
    id: number;
    quantity: number;
};

type cartItemStateProps = {
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
};

// cart 안에 있는 상품 관리
export const cartState = atom<CartItem[]>({
    key: "cartState",
    default: [],
});

export const cartItemState = selector({
    key: "cartItemsState",
    get: ({ get }) => {
        const getItemQuantity = (id: number) => {
            const cartItems = get(cartState);
            return cartItems.find((item) => item.id === id)?.quantity || 0;
        };

        const incrementCartQuantity = (id: number) => {
            const cartItems = get(cartState);
            cartItems.map((curItem: CartItem) => {
                if (curItem[id] !== id) {
                    return [curItem, { id, quantity: 1 }];
                } else {
                    // 똑같은 상품이 이미 카트에 있으면
                    if (curItem[id] === id) {
                        return { curItem, quantity: curItem.quantity + 1 };
                    } else {
                        return curItem;
                    }
                }
            });
        };

        const decrementCartQuantity = (id: number) => {
            const cartItems = get(cartState);
            cartItems.map((curItem: CartItem) => {
                if (curItem[id] === id && curItem.quantity === 1) {
                    return cartItems.filter((cur) => cur[id] !== id);
                } else {
                    // 똑같은 상품이 이미 카트에 있으면
                    if (curItem[id] === id) {
                        return { curItem, quantity: curItem.quantity - 1 };
                    } else {
                        return curItem;
                    }
                }
            });
        };

        const removeFromCart = (id: number) => {
            const cartItems = get(cartState);
            // cart에 해당 아이템 있으면 제거
            cartItems.map((curItems: CartItem) => {
                return cartItems.filter((item) => item.id !== id);
            });
        };

        const cartTotal = () => {
            const cartItems = get(cartState);
            return cartItems.length;
        };

        return {
            getItemQuantity,
            incrementCartQuantity,
            decrementCartQuantity,
            removeFromCart,
            cartTotal,
        };
    },
});
