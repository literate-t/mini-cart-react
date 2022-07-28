import React from 'react';

const MAX_COUNT = 10;
const MIN_COUNT = 1;
const CartList = ({ cartItems, setCartItems }) => {
    const remove = (index) => {
        setCartItems((items) => items.filter((_, i) => i !== index));

        // const newCartList = [...cartItems];
        // newCartList.splice(index, 1);
        // setCartItems(newCartList);
    };

    const increase = (index) => {
        const newList = [...cartItems];
        const item = newList[index];
        if (item.count < MAX_COUNT) {
            item.count += 1;
            setCartItems(newList);
        } else {
            alert('장바구니에 담을 수 있는 최대 수량은 10개입니다.');
        }
    };

    const decrease = (index) => {
        const newList = [...cartItems];
        const item = newList[index];
        if (MIN_COUNT < item.count) {
            item.count -= 1;
            setCartItems(newList);
        } else {
            alert('장바구니에 담을 수 있는 최소 수량은 1개입니다.');
        }
    };
    return (
        <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
                <Cart
                    key={item.id}
                    item={item}
                    remove={remove}
                    increase={increase}
                    decrease={decrease}
                    index={index}
                />
            ))}
        </ul>
    );
};

const Cart = ({ item, remove, increase, decrease, index }) => {
    const { id, imgSrc, name, count, price } = item;
    return (
        <li className="flex py-6" id={id}>
            <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={imgSrc}
                    className="h-full w-full object-cover object-center"
                    alt={name}
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{name}</h3>
                        <p className="ml-4">
                            {(price * count).toLocaleString()}원
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between">
                    <div className="flex text-gray-500">
                        <button
                            className="decrease-btn"
                            onClick={() => decrease(index)}
                        >
                            -
                        </button>
                        <div className="mx-2 font-bold">{count}개</div>
                        <button
                            className="increase-btn"
                            onClick={() => increase(index)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        type="button"
                        className="font-medium text-sky-400 hover:text-sky-500"
                        onClick={() => remove(index)}
                    >
                        <p className="remove-btn">삭제하기</p>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartList;
