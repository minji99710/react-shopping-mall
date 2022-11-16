import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Fashion } from "./pages/Fashion";
import { Accessories } from "./pages/Accessories";
import { Digital } from "./pages/Digital";
import { Nav } from "./components/Nav";
import { Cart } from "./pages/Cart";
import Product from "./components/Product";
import { Footer } from "./components/Footer";

function App() {
    return (
        <>
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
                <Footer />
            </Nav>
        </>
    );
}

export default App;
