import React from 'react';
import { useNavigate } from 'react-router-dom';
import './category.css';

const Category = ({ categories }) => {
    const navigate = useNavigate();

    return (
        <div className='shop-by-category'>
            <div className='categories'>
                {categories && categories.length > 0 ? (
                    categories.map((item) => (
                        <div 
                            key={item.id} 
                            className='category' 
                            onClick={() => navigate(`/category/${item.id}`)} // Navigate to individual category
                        >
                            {item.img && item.img.url ? (
                                <img 
                                    src={`${import.meta.env.VITE_DEV_URL}${item.img.url}`} 
                                    alt={item.title || 'Category Image'} 
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <p>{item.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>
        </div>
    );
};

export default Category;
