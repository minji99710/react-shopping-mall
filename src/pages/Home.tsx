import { Products } from "../components/Products";
import { Slider } from "../components/Slider";

export function Home() {
    return (
        <>
            {/* 캐러셀 */}
            <Slider />
            {/* 카테고리별 상품 */}
            <Products ctg="패션" lim={10} isScrollX={true} />
            <Products ctg="액세서리" lim={10} isScrollX={true} />
            <Products ctg="디지털" lim={10} isScrollX={true} />
        </>
    );
}
