import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Fashion } from "./pages/Fashion";
import { Accessories } from "./pages/Accessories";
import { Digital } from "./pages/Digital";
import { Nav } from "./components/Nav";
import { Cart } from "./pages/Cart";
import { Product } from "./components/Product";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import React, { useEffect, useState } from "react";
import { ProductProps } from "./components/Products";
import { PurchaseModal } from "./components/PurchaseModal";

interface ProductsContext {
    loading: boolean;
    apiResponse: ProductProps[];
}

export const DataContext = React.createContext({} as ProductsContext);

function App() {
    const [apiResponse, setApiResponse] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    const API_URL = "https://fakestoreapi.com/products";
    useEffect(() => {
        // 데이터 가져오기
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(API_URL);
            if (componentMounted) {
                setApiResponse(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            };
        };
        getProducts();
    }, []);

    return (
        <DataContext.Provider value={{ loading, apiResponse }}>
            <ShoppingCartProvider>
                <Nav>
                    <div className="mb-4 con">
                        <Routes>
                            <Route>
                                <Route path="/" element={<Home />} />
                                <Route path="/:id" element={<Product />} />
                                <Route path="/fashion" element={<Fashion />} />
                                <Route
                                    path="/accessories"
                                    element={<Accessories />}
                                />
                                <Route path="/digital" element={<Digital />} />
                                <Route path="/cart" element={<Cart />} />
                            </Route>
                        </Routes>
                    </div>
                </Nav>
                <PurchaseModal />
            </ShoppingCartProvider>
        </DataContext.Provider>
    );
}

export default App;
