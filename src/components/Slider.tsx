import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export function Slider() {
    interface SliderItemProps {
        category: string;
        title: string;
        description: string;
        imgUrl: string;
    }

    const items = [
        {
            category: "fashion",
            title: "물 빠진 청바지",
            description: "이제 막 도착한 패션 청바지를 구경해 보세요.",
            imgUrl: "https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg",
        },
        {
            category: "digital",
            title: "신속한 업무처리",
            description: "다양한 디지털 상품을 둘러보세요.",
            imgUrl: "https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg",
        },
        {
            category: "grocery",
            title: "신선한 식품",
            description: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
            imgUrl: "https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg",
        },
    ];

    return (
        <Carousel
            autoPlay
            infiniteLoop
            swipeable
            showThumbs={false}
            showStatus={false}
        >
            {items.map((item: SliderItemProps, index: number) => (
                <div key={index} className="carousel-slide">
                    <div>
                        <div className="carousel-content left-10 absolute bottom-1/4 text-white text-left lg:container lg:mb-10">
                            <h2 className="text-2xl lg:text-4xl font-bold">
                                {item.title}
                            </h2>
                            <p className="my-2">{item.description}</p>
                            <Link
                                to={`/${item.category}`}
                                className="btn btn-sm mt-4 lg:btn-md mt-3"
                            >
                                <span className="pr-2">바로가기</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <img
                            src={item.imgUrl}
                            // className="w-max-full max-h-2800 min-h-880"
                        />
                    </div>
                </div>
            ))}
        </Carousel>
    );
}
