import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../Slice/userSlice"
import landingPageSlice from "../Slice/landingPageSlice.js"
import cartReducer from "../Slice/cartSlice.js"
import wishlistReducer from "../Slice/wishlistSlice.js"
export default configureStore({
  reducer: {
    userData: userReducer,
    landingPageData : landingPageSlice,
    cart : cartReducer ,
    wishlist : wishlistReducer ,
  },
})