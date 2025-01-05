import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
	},
	reducers: {
		addItem: (state, action) => {
			state.items.push({
				id: uuidv4(),
				...action.payload,
			})
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload.id)
		},
		clearCart: state => {
			state.items = []
		},
	},
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
