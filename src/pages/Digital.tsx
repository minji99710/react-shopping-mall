import { Breadcrumbs } from "../components/Breadcrumbs";
import { Products } from "../components/Products";

export function Digital() {
    return (
        <>
            <section className="pt-4 pl-5">
                <Breadcrumbs category="홈" depth="디지털" />
                <Products ctg="디지털" lim={10} isScrollX={false} />
            </section>
        </>
    );
}
