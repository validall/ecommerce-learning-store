import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

const ProductList = ({ addToCart, searchTerm }) => {
    const { category } = useParams();
    // State for products display, loading status, and full product list
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]); // Store all products for search

    // Fetch products when component mounts or category changes
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const productsData = await fetchProducts();
                setAllProducts(productsData); // Save all products for search filtering

                // Filter products by category if specified
                const filteredByCategory = category
                    ? productsData.filter(product => product.category === category)
                    : productsData;

                setProducts(filteredByCategory);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [category]); // Reload when category changes

    // Filter products when search term changes
    useEffect(() => {
        if (!searchTerm.trim()) {
            // If search is empty, only filter by category
            const filteredByCategory = category
                ? allProducts.filter(product => product.category === category)
                : allProducts;
            setProducts(filteredByCategory);
            return;
        }

        // Filter by both search term and category
        const searchResults = allProducts.filter(product => {
            const matchesSearch =
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());

            // Check category if it's specified
            return category
                ? matchesSearch && product.category === category
                : matchesSearch;
        });

        setProducts(searchResults);
    }, [searchTerm, allProducts, category]);

    // Show loading state while fetching data
    if (loading) return <div className="text-center p-8">Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            {/* Display category title if viewing a category */}
            {category && (
                <h1 className="text-2xl font-bold mb-4 capitalize">{category}</h1>
            )}

            {/* Show search results message if searching */}
            {searchTerm && (
                <p className="mb-4 text-gray-400">
                    {products.length === 0
                        ? `No products found for "${searchTerm}"`
                        : `Found ${products.length} results for "${searchTerm}"`}
                </p>
            )}

            {/* Display product grid or "no products" message */}
            {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8">
                    <p className="text-xl">No products found.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;