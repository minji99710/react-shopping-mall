import { Category } from "../constant/category";

interface BreadCrumbProps {
    category: string;
    depth: string;
}

export function Breadcrumbs({ category, depth }: BreadCrumbProps) {
    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul className="ml-2 sm:ml-0">
                    <li>
                        {!!Category[category] ? Category[category] : category}
                    </li>
                    <li>{depth}</li>
                </ul>
            </div>
        </>
    );
}
