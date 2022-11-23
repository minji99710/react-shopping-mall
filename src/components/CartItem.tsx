import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import { useShoppingCart, CartItemProps } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

// cart내 상품
export function CartItem({ id, quantity }: CartItemProps) {
    const { increaseItemQuantity, decreaseItemQuantity } = useShoppingCart();
    const { apiResponse } = useContext(DataContext);
    if (apiResponse == null) return null;
    const cartItem = apiResponse?.find((item) => item.id === id);

    return (
        <>
            {cartItem && (
                <div className="mt-4 lg:flex my-16 ">
                    <Link key={"Product"} to={`/${id}`}>
                        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl p-4 bg-white">
                            <img
                                src={cartItem.image}
                                alt={cartItem.title}
                                className="h-48"
                            />
                        </figure>
                    </Link>
                    <div className="card-body px-4 lg:px-0">
                        <h2 className="cart-title">
                            <Link key={"Product"} to={`/${id}`}>
                                {cartItem.title}
                            </Link>
                        </h2>
                        <p>{formatCurrency(cartItem.price * quantity)}</p>
                        <div className="card-actions">
                            <div className="btn-group">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => decreaseItemQuantity(id)}
                                >
                                    -
                                </button>
                                <button className="btn btn-ghost no-animation">
                                    {quantity}
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => increaseItemQuantity(id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
