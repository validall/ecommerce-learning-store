import React from 'react';

const Cart = ({ cartItems, setCartItems }) => {
    // Updates item quantity and ensures it's never less than 1
    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Removes an item from the cart completely
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Calculate total price for all items in cart
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Display message when cart is empty
    if (cartItems.length === 0) {
        return <div className="container mx-auto p-8 text-center">Your cart is empty.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="grid gap-4">
                {/* Map through cart items and display each one */}
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border p-4 rounded"
                    >
                        {/* Item information */}
                        <div>
                            <h2 className="font-bold">{item.title}</h2>
                            <p>${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity controls and remove button */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                            >
                                -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                            >
                                +
                            </button>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart summary and checkout button */}
            <div className="mt-4 text-right">
                <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
                <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;