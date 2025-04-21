import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Store logo/name with link to homepage */}
                <Link to="/" className="text-2xl font-bold">Learning Store</Link>

                {/* Cart icon with item count */}
                <div className="relative">
                    <Link to="/cart" className="flex items-center">
                        <span className="mr-2">Cart</span>
                        {/* Shopping cart icon */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>

                        {/* Item count badge */}
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;