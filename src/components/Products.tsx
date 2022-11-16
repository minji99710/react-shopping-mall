import { useState, useEffect } from "react";
import axios from "axios";

import { formatCurrency } from "../utilities/formatCurrency";
import { NavLink } from "react-router-dom";

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

export function Products() {
    const [data, setData] = useState<ProductProps[]>([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const API_URL = "https://fakestoreapi.com/products";

    useEffect(() => {
        // 데이터 가져오기
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(API_URL);
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            };
        };
        getProducts();
    }, []);

    const Loading = () => {
        return <>Loading...</>;
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {data
                        .filter((d) =>
                            d.category.includes(categoryNames[category])
                        )
                        .slice(0, limit)
                        .map(({ id, image, title, price }: ProductProps) => {
                            return (
                                <NavLink
                                    key={id}
                                    to={`/${id}`}
                                    className="card card-compact h-full bg-base-100 border-solid border border-gray-200 rounded-xl lg:card-normal"
                                >
                                    <figure className="flex h-80 bg-white overflow-hidden object-cover py-5 px-10">
                                        <img
                                            src={image}
                                            alt="상품 이미지"
                                            className="h-1/2"
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

    const ShowProductsAllCategory = () => {
        return (
            <>
                <ShowProducts category="패션" limit={4} />
                <ShowProducts category="액세서리" limit={4} />
                <ShowProducts category="디지털" limit={4} />
            </>
        );
    };

    return (
        <div>
            <section className="pt-6 container mx-auto">
                <h2 className="font-bold text-xl"></h2>
                {loading ? <Loading /> : <ShowProductsAllCategory />}
            </section>
        </div>
    );
}
