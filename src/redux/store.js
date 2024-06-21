// store.js
import { configureStore } from '@reduxjs/toolkit'
import goodsSlice from './goodsSlice'

const store = configureStore({
	reducer: {
		goods: goodsSlice,
	},
})

export default store
