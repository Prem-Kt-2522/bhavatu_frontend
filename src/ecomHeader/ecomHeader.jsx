import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { TbSearch } from 'react-icons/tb'; // Import icons
import { CgShoppingCart } from 'react-icons/cg'; // Import icons
import { AiOutlineHeart } from 'react-icons/ai'; // Import icons
import { useNavigate } from 'react-router-dom';
import './ecomHeader.css'; // Ensure this path is correct
import Search from '../search/search';
import Cart from '../cart/Cart';
import { useAppContext } from '../../utils/context'; // Adjust the import path according to your structure
import "../prod/prod" ;
import "../Category/category";
const EcomHeader = () => {
    const navigate = useNavigate(); // Correctly initialize navigate
    const [scrolled, setScrolled] = useState(false);
    const [ShowCart, setShowCart] = useState(false);
    const [ShowSearch, setShowSearch] = useState(false);
    const { cartCount } = useAppContext(); // Get cartCount from context

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <>
            <header className={`main-header${scrolled ? ' sticky-header' : ''}`}>
                <div className="header-content">
                    <ul>
                        <li onClick={() => navigate('/prod')}>Home</li>
                        <li onClick={() => navigate('/category')}>Cateegory</li>
                    </ul>
                    <div className="center"></div>
                    <div className="right">
                        <TbSearch onClick={() => setShowSearch(true)} />
                        <AiOutlineHeart />
                        <span className="cart-icon" onClick={() => setShowCart(true)}>
                            <CgShoppingCart />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Display cart count */}
                        </span>
                    </div>
                </div>
            </header>
            {ShowCart && <Cart setShowCart={setShowCart} />}
            {ShowSearch && <Search setShowSearch={setShowSearch} />}
        </>
    );
};

export default EcomHeader;
