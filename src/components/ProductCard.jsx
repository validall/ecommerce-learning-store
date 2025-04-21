import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-800 flex flex-col">
            {/* Product details wrapped in link for navigation to product page */}
            <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                {/* Product image container with fixed height */}
                <div className="h-32 overflow-hidden bg-white p-2 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-28 w-auto object-contain"
                    />
                </div>

                {/* Product title */}
                <div className="p-3 flex-grow">
                    <h2 className="font-bold text-sm mb-1 text-white hover:text-blue-300">
                        {product.title}
                    </h2>
                </div>
            </Link>

            {/* Price and add to cart button */}
            <div className="p-3 pt-0">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

