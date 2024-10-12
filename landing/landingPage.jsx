import axios from "axios";
import React, { useState } from "react";
import "./landingPage.css";

const LandingPage = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const applyFilters = async () => {
        const search = document.getElementById('searchBox').value;
        const category = document.getElementById('category').value;
        const rating = document.getElementById('rating').value;
        const organic = document.getElementById('organic').checked ? 'true' : 'false';
        const priceRange = document.getElementById('priceRange').value;
        
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                params: { search, category, rating, organic, price_range: priceRange }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    // Toggle Modal Visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <main>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <h1>Local Farm Products</h1>
                        </div>
                        <div className="search-filter">
                            <input type="text" id="searchBox" placeholder="Search Farm Products..." />
                            <button id="searchButton">Search</button>
                        </div>
                        <div className="search-filter">
                            <button id="filterButton" onClick={toggleModal}>Filter</button>
                        </div>
                        <ul className="nav-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropbtn">Menu</a>
                            </li>
                            <li><a href="#"></a>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* Filter Modal */}
            <div id="filterModal" className={isModalOpen ? 'modal show' : 'modal'}>
                <div className="modal-content">
                    <h2>Filter</h2>
                    <div className="first">
                        <label htmlFor="category">Category</label>
                        <select id="category">
                            <option value="">All Categories</option>
                            <option value="fruits">Fruits</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="diary">Diary</option>
                            <option value="herbs">Herbs</option>
                            <option value="beverages">Beverages</option>
                            <option value="grains">Grains</option>
                            <option value="spices & condiments">Spices & Condiments</option>
                            <option value="nuts">Nuts</option>
                        </select>
                    </div>
                    <div className="first">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" id="rating" min="1" max="5" placeholder="1-5" />
                    </div>
                    <div className="first">
                        <label htmlFor="organic">Organic only</label>
                        <input type="checkbox" id="organic" />
                    </div>
                    <div className="first">
                        <label htmlFor="priceRange">Price Range</label>
                        <select id="priceRange">
                            <option value="">Any</option>
                            <option value="min">Below 500</option>
                            <option value="medium">500-2000</option>
                            <option value="max">Above 2000</option>
                        </select>
                    </div>
                    <button id="applyFilters" onClick={applyFilters}>Apply Filters</button>
                    <button onClick={toggleModal}>Close</button>
                </div>
            </div>
            {/* Product Listing */}
            <section>
                <h2>Products</h2>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.name} - {product.category} - ${product.price} - {product.rating} stars
                            </li>
                        ))}
                </ul>
            </section>
        </main>
    );
};
export default LandingPage;
