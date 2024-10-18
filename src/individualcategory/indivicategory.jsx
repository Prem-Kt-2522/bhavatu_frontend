import React from 'react'; // Add this line
import { useParams } from "react-router-dom";
import useFetch from "../../src/hooks/useFetch";
import Products from "../Products/products";
import "./indivicategory.css";

const IndiviCategory = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetch(
        `/api/products?populate=*&[filters][categories][id]=${id}` // Fetch products based on category ID
    );

    return (
        <div className="category-main-content">
            <div className="layout">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}

                {/* Display category title if data is available */}
                {data?.data?.[0]?.attributes?.categories?.data?.length > 0 && (
                    <div className="category-title">
                        {data.data[0].attributes.categories.data[0].attributes.title}
                    </div>
                )}

                {/* Render products if data is available */}
                {data && <Products innerPage={true} products={data.data} />} {/* Ensure to pass the correct products array */}
            </div>
        </div>
    );
};

export default IndiviCategory;
