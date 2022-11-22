import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

function PurchaseModal() {
    const { removeFromCart } = useShoppingCart();
    return (
        <>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        정말로 구매하시겠습니까?
                    </h3>
                    <p className="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-6"
                            className="btn btn-primary mx-2"
                            onClick={() => removeFromCart()}
                        >
                            네
                        </label>
                        <label htmlFor="my-modal-6" className="btn btn-outline">
                            아니오
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchaseModal;
