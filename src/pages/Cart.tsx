import { useContext } from "react";
import { DataContext } from "../App";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

export function Cart() {
    const { cartItems } = useShoppingCart();
    const { apiResponse } = useContext(DataContext);

    return (
        <>
            <section className="pt-4 md:pt-5 pb-4 px-2 lg:px-4 pb-8 xl:container mx-auto">
                <Breadcrumbs category="홈" depth="장바구니" />
                {/* 장바구니에 담은 상품 */}
                <div className="mt-6 md:mt-14 px-2 lg:px-0 w-full">
                    <div className="lg:mb-10">
                        <div className="lg:flex justify-between mb-20">
                            <div>
                                {!cartItems.length
                                    ? "장바구니에 물품이 없습니다."
                                    : cartItems.map((item) => (
                                          <CartItem key={item.id} {...item} />
                                      ))}
                            </div>
                            {/* 총 가격과 구매하기 */}
                            <div className="self-start shrink-0 flex items-center mt-10 mb-20">
                                <span className="text-xl md:text-2xl">
                                    총 :{" "}
                                    {cartItems.length &&
                                        formatCurrency(
                                            cartItems.reduce(
                                                (total, carItem) => {
                                                    const item =
                                                        apiResponse?.find(
                                                            (item) =>
                                                                item.id ===
                                                                carItem.id
                                                        );
                                                    return (
                                                        total +
                                                        (item?.price || 0) *
                                                            carItem.quantity
                                                    );
                                                },
                                                0
                                            )
                                        )}
                                </span>
                                <label
                                    htmlFor="my-modal-6"
                                    className="btn btn-primary ml-4"
                                >
                                    구매하기
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
