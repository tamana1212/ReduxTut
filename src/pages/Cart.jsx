import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch  } from "react-redux";
import { remove, plus, minus } from "../store/cartSlice"
import { showToast } from "../store/toastSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems])

  const  removeFromCart = (itemId) => {
      dispatch(remove(itemId));
       dispatch(showToast({ message: "Product remvoed from  cart!", type: "success" }))
  }  
  
  const plusItem = (itemId) => {
    dispatch(plus(itemId));
  }

  const minusItem = (itemId) => {
    dispatch(minus(itemId));
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600 mb-5">Your cart is empty</p>
            <Link
              to="/"
              className=" bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div key={item.id} className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="flex items-center p-6 border-b border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-grow ml-4">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-gray-600">{item.model}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-3 py-1 border rounded-l"
                        onClick={() => minusItem(item.id)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 border rounded-r"
                        onClick={() => plusItem(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-8">
                      <p className="text-lg font-semibold">{item.price}</p>
                      <button
                        className="text-red-500 hover:text-red-700 mt-2"
                        onClick={() =>
                         removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$2.50</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          cartItems.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          ) +
                          5 +
                          2.5
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </div>
              <button className="w-full mt-4 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
