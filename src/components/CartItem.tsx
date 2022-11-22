import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";
import { useShoppingCart, CartItemProps } from "../context/ShoppingCartContext";
import { cartState } from "../scripts/cart";
import { formatCurrency } from "../utilities/formatCurrency";

// cart에 있는 각 아이템
export function CartItem({ id, quantity }: CartItemProps) {
    const { increaseItemQuantity, decreaseItemQuantity } = useShoppingCart();
    const { apiResponse } = useContext(DataContext);
    if (apiResponse == null) return null;
    const cartItem = apiResponse?.find((item) => item.id === id);

    return (
        <>
            {cartItem && (
                <div className="mt-4 lg:flex my-16 ">
                    <NavLink key={"Product"} to={`/${id}`}>
                        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl p-4 bg-white">
                            <img
                                src={cartItem.image}
                                alt={cartItem.title}
                                className="h-48"
                            />
                        </figure>
                    </NavLink>
                    <div className="card-body px-4 lg:px-0">
                        <h2 className="cart-title">
                            <NavLink key={"Product"} to={`/${id}`}>
                                {cartItem.title}
                            </NavLink>
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
