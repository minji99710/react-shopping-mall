import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { CartItem } from "../components/CartItem";
import Product from "../components/Product";

import { formatCurrency } from "../utilities/formatCurrency";

// Cart type
export type cartItemProps = {
    id: number;
    quantity: number;
};

export type cartFunctionsProps = {
    getItemQuantity: (id: number) => number;
    incrementCartQuantity: (id: number) => void;
    decrementCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
};

// Cart state 를 atom으로 정의하기
export const cartState = atom<cartItemProps[]>({
    key: "cartState",
    default: [],
});

// 필요한 함수 : remove
export function Cart() {
    // set state => useState와 같은 기능
    const [cartItems, setCartItems] = useRecoilState(cartState);

    const removeFromCart = (id: number) => {
        // cart에 해당 아이템 있으면 제거
        setCartItems((curItems) => {
            return curItems.filter((item) => item.id !== id);
        });
    };

    // const cartItemsState = selector({
    //     key: "cartItemsState",
    //     get: ({ get }) => {
    //         const getItemQuantity = (id: number) => {
    //             return cartItems.find((item) => item.id === id)?.quantity || 0;
    //         };

    //         const removeFromCart = (id: number) => {
    //             // cart에 해당 아이템 있으면 제거
    //             setCartItems((curItems) => {
    //                 return curItems.filter((item) => item.id !== id);
    //             });
    //         };

    //         return {
    //             getItemQuantity,
    //             incrementCartQuantity,
    //             decrementCartQuantity,
    //             removeFromCart,
    //         };
    //     },
    // });

    return (
        <>
            <div className="mt-6 md;mt-14 px-2 lg:px-0">
                <div className="breadcrumbs">breadcrumbs</div>
                {/* 장바구니에 담은 상품 */}
                <div className="lg:flex justtify-between mb-20">
                    <div>
                        {!cartItems.length
                            ? "No Items"
                            : cartItems.map((item) => (
                                  <CartItem key={item.id} {...item} />
                              ))}
                    </div>
                    {/* 총 가격과 구매하기 */}
                    <div>
                        총 :{" "}
                        {cartItems.length &&
                            formatCurrency(
                                cartItems.reduce(
                                    (acc, cur) => acc + cur.quantity,
                                    0
                                )
                            )}
                        <button className="btn btn-primary">구매하기</button>
                    </div>
                </div>
            </div>
        </>
    );
}
