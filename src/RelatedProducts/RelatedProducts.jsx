import React from 'react';
import Products from '../Products/products';
import useFetch from '../hooks/useFetch';

const RelatedProducts = ({ productId, categoryId }) => {
  const { data, error, loading } = useFetch(
    `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );

  // Debugging logs
  console.log("Fetched related products data:", data);
  if (error) {
    console.error("Error fetching related products:", error);
  }

  if (loading) {
    return <p>Loading related products...</p>;
  }

  // Check if data is available
  if (!data || data.data.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className='related-products'>
      <Products headingText="Related Products" products={data.data} />
    </div>
  );
};

export default RelatedProducts;
