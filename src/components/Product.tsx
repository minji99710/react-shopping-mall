import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
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
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li>
                                    <a>{product.category}</a>
                                </li>
                                <li>
                                    <a>{product.title}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-12 flg:flex lg:items-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full object-contain h-72 flex-shrink-0 py-4"
                            />
                            <div className="card-body">
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
                                    <button className="btn btn-primary w-">
                                        장바구니에 담기
                                    </button>
                                    <button className="btn btn-outline">
                                        <NavLink to={"/cart"}>
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
