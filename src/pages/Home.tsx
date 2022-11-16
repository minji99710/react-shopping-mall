import { useEffect, useState } from "react";
import axios from "axios";
import { Products } from "../components/Products";

export function Home() {
    return (
        <>
            {/* 캐러셀 */}
            {/* 상품 카드 -> 여기서 data fetching해서 넘겨주면 DataFetching 컴포넌트에서 받아서 render*/}
            <Products />
        </>
    );
}
