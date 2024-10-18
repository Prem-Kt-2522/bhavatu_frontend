import React, { useEffect, useContext } from "react";
import EcomHeader from '../ecomHeader/ecomHeader';
import Banner from '../ecombanner/banner';
import Category from '../Category/category';
import Products from '../Products/products';
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import './prod.css';

const Prod = () => {
  const { categories, setCategories, products, setProducts } = useContext(Context);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchDataFromApi("/api/categories?populate=*");
        if (res.data && Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const getProducts = async () => {
      try {
        const res = await fetchDataFromApi("/api/products?populate=*");
        if (res.data && Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getCategories();
    getProducts();
  }, [setCategories, setProducts]);

  return (
    <div>
      <EcomHeader />
      <Banner />
      <div className='main-content'>
        <div className='layout'>
          <Category categories={categories} />
          <Products products={products} headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
};

export default Prod;
