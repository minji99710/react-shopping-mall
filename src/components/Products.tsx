import { useState, useEffect, useContext } from "react";

import { formatCurrency } from "../utilities/formatCurrency";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";

export type ProductProps = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

interface categoryNamesType {
    [index: string]: string;
    패션: string;
    액세서리: string;
    디지털: string;
}

const categoryNames: categoryNamesType = {
    패션: "clothing",
    액세서리: "jewelery",
    디지털: "electronics",
};

type ProductsCtgProps = {
    ctg: string;
    lim: number;
};

export function Products({ ctg, lim }: ProductsCtgProps) {
    const { apiResponse, loading } = useContext(DataContext);
    const Loading = () => {
        return <div>Loading...</div>;
    };

    type ProductProps = {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
    };

    type Category = {
        category: string;
        limit: number;
    };

    const ShowProducts = ({ category, limit }: Category) => {
        return (
            <>
                <h2 className="text-4xl font-bold mt-14 mb-5 text-center">
                    {category}
                </h2>

                <div className="grid gap-6 grid-flow-col overflow-x-auto sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-4">
                    {apiResponse
                        .filter((d) =>
                            d.category.includes(categoryNames[category])
                        )
                        .slice(0, limit)
                        .map(({ id, image, title, price }: ProductProps) => {
                            return (
                                <NavLink
                                    key={id}
                                    to={`/${id}`}
                                    className="card card-compact h-full bg-base-100 border-solid 
                                        border border-gray-200 rounded-xl min-w-[240px] lg:card-normal "
                                >
                                    <figure className="flex h-80 bg-white overflow-hidden object-cover py-5 px-10">
                                        <img
                                            src={image}
                                            alt="상품 이미지"
                                            className="h-1/2 transition-transform duration-300"
                                        />
                                    </figure>
                                    <div className="card-body bg-gray-200">
                                        <h2 className="card-title text-base">
                                            {title}
                                        </h2>
                                        <p className="text-base">
                                            {formatCurrency(price)}
                                        </p>
                                    </div>
                                </NavLink>
                            );
                        })}
                </div>
            </>
        );
    };

    return (
        <div>
            <section className="pt-6 px-4 container mx-auto">
                {loading ? (
                    <Loading />
                ) : (
                    <ShowProducts category={ctg} limit={lim} />
                )}
            </section>
        </div>
    );
}
