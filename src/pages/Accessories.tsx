import { Breadcrumbs } from "../components/Breadcrumbs";
import { Products } from "../components/Products";

export function Accessories() {
    return (
        <>
            <section className="pt-4 pl-5">
                <Breadcrumbs category="홈" depth="액세서리" />
                <Products ctg="액세서리" lim={10} isScrollX={false} />
            </section>
        </>
    );
}
