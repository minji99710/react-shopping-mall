import { Breadcrumbs } from "../components/Breadcrumbs";
import { Products } from "../components/Products";

export function Fashion() {
    return (
        <>
            <section className="pt-4 pl-5">
                <Breadcrumbs category="홈" depth="패션" />
                <Products ctg="패션" lim={6} />
            </section>
        </>
    );
}
