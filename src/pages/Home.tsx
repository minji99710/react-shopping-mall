import { useEffect, useState } from "react";
import axios from "axios";
import { Products } from "../components/Products";

export function Home() {
    return (
        <>
            {/* 캐러셀 */}
            {/* 상품 카드 -> 여기서 data fetching해서 넘겨주면 DataFetching 컴포넌트에서 받아서 render*/}
            <Products ctg="패션" lim={10} />
            <Products ctg="액세서리" lim={10} />
            <Products ctg="디지털" lim={10} />
        </>
    );
}
