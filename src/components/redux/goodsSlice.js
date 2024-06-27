import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	urls: {
		books: '',
		electronics: '',
		furniture: '',
		jewelry: '',
		pet_supplies: '',
		products: '',
		shoes: '',
		sport: '',
		stationery: '',
	},
	items: {
		books: [],
		electronics: [],
		furniture: [],
		jewelry: [],
		pet_supplies: [],
		products: [],
		shoes: [],
		sport: [],
		stationery: [],
	},
}

const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		setGoods(state, action) {
			state.urls = action.payload
			state.items = action.payload
		},
	},
})

export const { setGoods } = goodsSlice.actions
export default goodsSlice.reducer
