import './App.css';
import ProductList from './component/ProductList';
import CartList from './component/CartList';
import { useState } from 'react';
import BackDrop from './component/BackDrop';
import { useEffect } from 'react';
import getData from './api/getProductData';

function App() {
    const cartList = localStorage.getItem('cartList');
    const initialCartList = cartList ? JSON.parse(cartList) : [];
    const [productItems, setProductItems] = useState([]);
    const [cartItems, setCartItems] = useState(initialCartList);
    const [isCartOpen, setIsCartOpen] = useState(false);
    //const [totalCount, setTotalCount] = useState(0);

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const onSubmit = (e) => {
        localStorage.setItem('cartList', JSON.stringify(cartItems));
    };

    useEffect(() => {
        const fetchProductData = async () => {
            const result = await getData('/productData.json');
            setProductItems(result);
        };
        fetchProductData();
    }, []);

    const totalCount = cartItems.reduce(
        (acc, cur) => acc + cur.count * cur.price,
        0
    );

    // useEffect(() => {
    //     const result = cartItems.reduce(
    //         (acc, cur) => acc + cur.count * cur.price,
    //         0
    //     );
    //     setTotalCount(result);
    // }, [cartItems]);

    return (
        <div className="relative min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="flex justify-between mb-4">
                    <h2 className="text-3xl font-bold">오늘의 상품</h2>
                    <button
                        id="open-cart-btn"
                        className="fill-gray-400 hover:fill-gray-500"
                        onClick={toggleCart}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                        >
                            <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />
                        </svg>
                    </button>
                </header>
                <section id="product-list">
                    <div
                        id="product-card-grid"
                        className="grid gap-4 auto-cols-fr grid-cols-2 md:grid-cols-4"
                    >
                        {productItems.length === 0 ? (
                            <h1>상품이 없습니다</h1>
                        ) : (
                            <ProductList
                                productItems={productItems}
                                toggleCart={toggleCart}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                            />
                        )}
                    </div>
                </section>
            </div>

            {isCartOpen && <BackDrop onClick={toggleCart} />}

            <aside className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <section
                    className={`pointer-events-auto w-screen max-w-md transition ease-in-out duration-500 ${
                        isCartOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    id="shopping-cart"
                >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-xl font-bold">장바구니</h2>
                                <div className="ml-3 flex h-7 items-center">
                                    <button
                                        type="button"
                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                        onClick={toggleCart}
                                    >
                                        <svg
                                            id="close-cart-btn"
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div id="cart-list">
                                <CartList
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                />
                            </div>
                        </div>
                        <div className="border-t border-gray-200 p-6">
                            <div className="flex justify-between font-medium">
                                <p>결제금액</p>
                                <p className="font-bold" id="total-count">
                                    {totalCount.toLocaleString()}원
                                </p>
                            </div>
                            <a
                                id="payment-btn"
                                href="./"
                                className="flex items-center justify-center rounded-md border border-transparent bg-sky-400 px-6 py-3 mt-6 font-medium text-white shadow-sm hover:bg-sky-500"
                                onClick={onSubmit}
                            >
                                결제하기
                            </a>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    또는
                                    <button
                                        type="button"
                                        className="font-medium text-sky-400 hover:text-sky-500"
                                    >
                                        쇼핑 계속하기
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </aside>
            <footer className="text-center text-gray-500 text-xs pb-6">
                ©2022 Hanameee Corp. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
