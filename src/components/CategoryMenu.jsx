import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryMenu = ({ categories, searchTerm, setSearchTerm, showSearch }) => {
    const navigate = useNavigate();

    // Style for category buttons
    const buttonClassName = "px-4 py-2 rounded bg-gray-700 text-white hover:bg-blue-600 hover:text-white transition-colors";

    // Handle category selection
    const handleCategoryClick = (category) => {
        navigate(category === 'all' ? '/' : `/category/${category}`);
    };

    return (
        <nav className="bg-gray-800 shadow-md py-3">
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4">
                <div className="flex flex-wrap gap-3">
                    {/* "All categories" button */}
                    <button
                        onClick={() => handleCategoryClick('all')}
                        className={buttonClassName}
                    >
                        All Categories
                    </button>

                    {/* Individual category buttons */}
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={buttonClassName}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Search input - only shown on product listing pages */}
                {showSearch && (
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full p-1 pl-8 text-sm border rounded bg-gray-700 text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg
                            className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default CategoryMenu;