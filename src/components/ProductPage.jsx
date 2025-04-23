import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';

const ProductPage = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch individual product data when component mounts
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error loading product:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    // Add current product to cart
    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    // Show loading state while fetching data
    if (loading) return <div className="text-center p-8">Loading...</div>;

    // Show message if product not found
    if (!product) return <div className="text-center p-8">Product not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">

                <div className="md:w-1/2 flex justify-center items-center p-4">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-80 object-contain"
                    />
                </div>


                <div className="md:w-1/2 md:pl-6">
                    <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>


                    <div className="flex items-center mb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {product.category}
                        </span>
                    </div>


                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;