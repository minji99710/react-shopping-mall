import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProductProps } from "./Products";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps>({
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        rating: {
            rate: 0,
            count: 0,
        },
    });
    const [loading, setLoading] = useState(false);
    const API_URL = "https://fakestoreapi.com/products";
    const { increaseItemQuantity } = useShoppingCart();

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`);
            setProduct(await response.json());
            setLoading(false);
        };
        getProduct();
    }, []);

    const Loading = () => {
        return <>Loading...</>;
    };

    const ShowProduct = () => {
        return (
            <>
                {product && (
                    <section className="ml-1">
                        <Breadcrumbs
                            category={product.category}
                            depth={product.title}
                        />

                        <div className="px-4 mt-12 lg:px-0 lg:flex lg:items-center">
                            <figure className="bg-white rounded-xl flex-shrink-0 px-4 py-4 overflow-hidden lg:mr-3">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full object-contain rounded h-72 lg:px-6"
                                />
                            </figure>
                            <div className="card-body p-0 ml-2 mt-5 ">
                                <h2 className="card-title">
                                    {product.title}
                                    <div className="badge badge-accent">
                                        NEW
                                    </div>
                                </h2>
                                <p>{product.description}</p>
                                <div className="flex items-center mt-3">
                                    <div className="rating rating-md rating-half">
                                        {[
                                            0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5,
                                            5,
                                        ].map((rating, index) => (
                                            <input
                                                key={rating}
                                                className={classNames(
                                                    index % 2 == 0
                                                        ? "mask-half-1"
                                                        : "mask-half-2",
                                                    Number(
                                                        product.rating.rate
                                                    ) > rating
                                                        ? "bg-yellow-400"
                                                        : "bg-gray-400",
                                                    "mask mask-star-2 "
                                                )}
                                                aria-hidden="true"
                                                name="rating-10"
                                                type="radio"
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        {product.rating && product.rating.rate}{" "}
                                        /{product.rating.count} 참여
                                    </div>
                                </div>
                                <span className="text-3xl my-4">
                                    {formatCurrency(product.price)}
                                </span>
                                <div className="card-actions">
                                    <button
                                        className="btn btn-primary w-"
                                        onClick={() =>
                                            increaseItemQuantity(product.id)
                                        }
                                    >
                                        장바구니에 담기
                                    </button>
                                    <button className="btn btn-outline">
                                        <NavLink key={"Cart"} to={"/cart"}>
                                            장바구니로 이동
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </>
        );
    };

    return (
        <div>
            <div className="pt-4 container mx-auto">
                <div>{loading ? <Loading /> : <ShowProduct />}</div>
            </div>
        </div>
    );
}

export default Product;
