// import React from "react";
import "./Navbar.css";
// import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
// import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; 


const Navbar = ({setPic,pic,setlog,log }) => {
  const [user, setUser] = useState(null);
    const navigate = useNavigate();
const defaultPic = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHERUQBxAPFhUXEBIQGBcYFxUVFxAVFRUWGBUVFRMaHSggGBolHRoVITEhJSkrLi4uGB85ODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcCBQgBBAP/xABEEAABAwICBgYGBwQLAQAAAAABAAIDBBEFBgcSITFBURMiYXGBoRQycpKxwQg0QlJikdEVFiOzFzNDU1RzdIKTotNV/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALxREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEReE2QeooVmvSbh2W7sml6WUf2cdnEHtduCqfMGnGurbtweOKBvO3SP947PJB0YTbevjnxanpvrFRA32pGN+JXIeJ5qr8VJOIVlQ/s1yB7o2LTucXesT8UHZX7z0P+NpP+WP9V9UGLU9T9XqIHezIx3wK4pWTXFvqk/BB3ADfcvVxthmaq/CiDh9ZUM7Ncke6dinmX9ONdRWbjEcU7edujf7w2eSDo1FCsqaTcOzJZkMvRSn+zks0k9jtxU0Bug9REQEREBERAREQEREBERARFF89ZygyfB0tXZ0jriOMetI75AcSg2OZcxU2WoTPi0ga3cBvc88mDiVz1nrSxV5jJiw4ugg2jVabPkH43j4BRLNGZajM8xnxR5cdzW/ZjbyaOC0qDIm+9YoiAiIgIiICIiDIG25WLkXSxV5cIixEung2DVcbvjH4Hn4FVwiDszLWYqbMsInwmQObuI3OYeThwK2642yvmWoyxMJ8LeWnc5v2ZG8nDiuoci5ygzhB0tJZsjbCSM+tG75g8CglCIiAiIgIiICIiAiLwmyDUZox+HLVM+qrz1WjYL7Xu4NHaVydmzMU2aKh1TiDjcmzW8I2cGhS3TNnE5iqzBRuJggJYLbpJNz3/IKuEBERAREQEUzybo5rs1denaI4f76S7WkfgG93wUtflXLeWurj9fJUSDe2PcDysy/mUFPorf/AGtl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'; // Placeholder for default profile picture

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setPic(currentUser.photoURL); // Show user profile pic
            } else {
                setPic(defaultPic); // Set default pic after sign-out
            }
        });
        return () => unsubscribe();
    }, [setPic]);

    const handleSignOut = async (e) => {
        e.preventDefault(); 
        if (user) { 
            try {
                await signOut(auth);
                setlog(false)
                setUser(null); 
                setPic(defaultPic); // Manually set the default picture right after sign-out
                console.log("User signed out");
                navigate('/Login'); 
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        }
        setlog(false)
    };
  return (
    
    <nav className="navbar">
    <div className="logo-container">
        <img src={pic} alt="Logo" className="logo" />    
        <span className="brand-text">BHAVATU</span>
    </div>
    <div className="tabs-container">
        <Link className="tab" to="/">Home</Link>

        {/* Conditional rendering for Vastu and Products */}
        {user ? (
            <>
                <Link className="tab" to="/vastu">Vastu</Link>
                <Link className="tab" to="/prod">Products</Link>
                <Link className="tab" to="/DailyFeed">DailyFeed</Link>
                <Link className="tab" to="/kundli" onClick={handleSignOut}>Logout</Link>
            </>
        ) : (
            <>
                {/* Disable Vastu link when user is not authenticated */}
                <Link 
                    className="tab" 
                    to="/login" 
                    style={{textDecoration:'none', color: 'gray' }} 
                    onClick={() => alert('Please log in to access Vastu.')}
                >
                    Vastu 
                </Link>
                {/* Disable Products link when user is not authenticated */}
                <Link 
                    className="tab" 
                    to="/login" 
                    style={{ textDecoration:'none', color: 'gray' }} 
                    onClick={() => alert('Please log in to access Products.')}
                >
                    Products 
                </Link>
                {/* Disable DailyFeed link when user is not authenticated */}
                <Link 
                    className="tab" 
                    to="/login" 
                    style={{textDecoration:'none', color: 'gray' }} 
                    onClick={() => alert('Please log in to access DailyFeed.')}
                >
                    DailyFeed 
                </Link>
                <Link className="tab" to="/Login">Login</Link>
            </>
        )}
    </div>
</nav>

  );
};

export default Navbar;
