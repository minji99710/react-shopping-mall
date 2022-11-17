import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { cartState } from "../pages/Cart";

import { getProducts } from "./Products";

// Cart type
export type cartItemProps = {
    id: number;
    quantity: number;
};
// 필요한 함수: incrememnt, decrement
export function CartItem({ id, quantity }: cartItemProps) {
    const products = useRecoilValue(getProducts);
    const [cartItems, setCartItems] = useRecoilState(cartState);
    const item = products.find((i) => i.id === id);
    if (item == null) return null;

    const incrementCartQuantity = (id: number) => {
        setCartItems((curItems) => {
            if (curItems.find((item) => item.id !== id) == null) {
                return [...curItems, { id, quantity: 1 }];
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decrementCartQuantity = (id: number) => {
        setCartItems((curItems) => {
            // 상품이 1개 있는 경우 카드에서 삭제
            if (curItems.find((item) => item.id === id)?.quantity == 1) {
                return curItems.filter((item) => item.id !== id);
            } else {
                return curItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    return (
        <>
            <div mt-4>
                <a href={`/${item.id}`}>
                    <figure className="h-56">{item.image}</figure>
                </a>
                <p>{item.title}</p>
                <p>
                    formatCurrency({item.price} * {quantity})
                </p>
                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => incrementCartQuantity(id)}
                    >
                        +
                    </button>
                    <button className="btn btn-ghost no-animation">
                        {quantity}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => decrementCartQuantity(id)}
                    >
                        -
                    </button>
                </div>
            </div>
        </>
    );
}
