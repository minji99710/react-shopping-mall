import { useContext, useRef } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { NavLink } from "react-router-dom";
import { DataContext } from "../App";

export interface ProductProps {
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
}

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

interface ProductsCtgProps {
    ctg: string;
    lim: number;
    isScrollX: boolean;
}

export function Products({ ctg, lim, isScrollX }: ProductsCtgProps) {
    interface ProductProps {
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
    }

    interface Category {
        category: string;
        limit: number;
        isScrollX: boolean;
    }

    const { apiResponse, loading } = useContext(DataContext);
    const gridRef = useRef<HTMLDivElement>(null);

    const Loading = () => {
        return <div>Loading...</div>;
    };

    const ShowProducts = ({ category, limit, isScrollX }: Category) => {
        return (
            <>
                <h2 className="text-4xl font-bold mt-14 mb-5 text-center">
                    {category}
                </h2>

                <div className="overflow-x-scroll w-full sm:overflow-visible">
                    <div
                        className={`w-full grid gap-6 ${
                            isScrollX ? "grid-flow-col" : "grid-flow-row"
                        } auto-cols-[300px] sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-4`}
                        ref={gridRef}
                    >
                        {apiResponse
                            .filter((d) =>
                                d.category.includes(categoryNames[category])
                            )
                            .slice(0, limit)
                            .map(
                                ({ id, image, title, price }: ProductProps) => {
                                    return (
                                        <NavLink
                                            key={id}
                                            to={`/${id}`}
                                            className="card card-compact card-bordered h-full bg-base-100 border-solid 
                                            border border-gray-200 rounded-xl lg:card-normal dark:border-gray-800"
                                        >
                                            <figure className="flex h-80 bg-white overflow-hidden object-cover px-6">
                                                <img
                                                    src={image}
                                                    alt="상품 이미지"
                                                    className="h-1/2 flex-shrink-0 hover:transition-transform duration-300"
                                                />
                                            </figure>
                                            <div className="card-body bg-gray-200 rounded-b-xl dark:bg-gray-700">
                                                <h2 className="card-title text-base">
                                                    {title}
                                                </h2>
                                                <p className="text-base">
                                                    {formatCurrency(price)}
                                                </p>
                                            </div>
                                        </NavLink>
                                    );
                                }
                            )}
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <section className="pt-6 pb-4 px-4 container mx-auto ">
                {loading ? (
                    <Loading />
                ) : (
                    <ShowProducts
                        category={ctg}
                        limit={lim}
                        isScrollX={isScrollX}
                    />
                )}
            </section>
        </>
    );
}
