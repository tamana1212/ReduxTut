import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUS } from "../store/productSlice";
import { showToast } from "../store/toastSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      dispatch(showToast({ message: "Products fetched successfully!", type: "success" }))
    } else if (status === STATUS.FAILED) {
      dispatch(showToast({ message: "Failed to fetch products", type: "error" }))
    }
  }, [status, dispatch])


  const addToCart = (product) => {
    dispatch(add(product));
    dispatch(showToast({ message: "Product added to cart!", type: "success" }))
  };

  if (status === STATUS.LOADING) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (status === STATUS.FAILED) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-600">
          Error fetching products. Please try again.
        </p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-6">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">${product.price}</span>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
