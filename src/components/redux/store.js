import { configureStore } from '@reduxjs/toolkit'
import goodsSlice from './goodsSlice'
import cartSlice from './cartSlice'

const store = configureStore({
	reducer: {
		goods: goodsSlice,
		cart: cartSlice,
	},
})

export default store
