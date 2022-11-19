import axios from "axios";
import { selector } from "recoil";

const API_URL = "https://fakestoreapi.com/products";

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

export const productsData = selector<ProductProps[]>({
    key: "Products",
    get: async () => {
        try {
            const res = await axios(API_URL);
            return res.data || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
});
