import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import CategoryMenu from './components/CategoryMenu';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  // Calculate total number of items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Determine whether to show search based on current route
  const isSearchVisible = !location.pathname.includes('/cart') && !location.pathname.includes('/product/');

  // Fetch product categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Add product to cart or increase quantity if already in cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  return (
    <>

      <Header cartItemCount={cartItemCount} />


      <CategoryMenu
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSearch={isSearchVisible}
      />


      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} searchTerm={searchTerm} />} />
          <Route path="/category/:category" element={<ProductList addToCart={addToCart} searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
      </main>


      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>Learning Store - 2025</p>
      </footer>
    </>
  );
}

export default App;
