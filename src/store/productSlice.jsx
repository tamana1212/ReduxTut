import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "./toastSlice"

export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
});

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUS.IDLE,
  },
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state, action) =>{
      state.status = STATUS.LOADING;
    })
    .addCase(fetchProducts.fulfilled, (state, action) =>{
      state.data = action.payload;
      state.status = STATUS.SUCCESS;
    })
    .addCase(fetchProducts.rejected, (state, action) =>{
      state.status = STATUS.FAILED;
    })
  }
});

export const { setProducts, setStatus } = ProductSlice.actions;

export default ProductSlice.reducer;

// Thunks

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    localStorage.setItem("products", JSON.stringify(data));
    return data;
  } catch (err) {
    dispatch(showToast({ message: "Failed to fetch products", type: "error" }))
    console.error("Failed to fetch products:", err);
  }
});

// export const fetchProducts = () => {
//   return async (dispatch) => {
//     dispatch(setStatus(STATUS.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUS.SUCCESS));
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//       dispatch(setStatus(STATUS.FAILED));
//     }
//   };
// };
