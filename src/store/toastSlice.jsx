import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isVisible: false,
  message: "",
  type: "success",
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.isVisible = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideToast: (state) => {
      state.isVisible = false
    },
  },
})

export const { showToast, hideToast } = toastSlice.actions
export default toastSlice.reducer

