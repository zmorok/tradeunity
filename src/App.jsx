import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Basket from './components/Basket/Basket'
import Account from './components/Account/Account'
import Catalog from './components/Catalog/Catalog'
import Page from './components/Page/Page'
import Footer from './components/Footer/Footer'

import './root.css'

const App = () => {
	return (
		<>
			<Router basename='/tradeunity'>
				<Header />
				<Routes>
					<Route path='catalog' element={<Catalog />} />
					<Route path='shoes' element={<Page title='shoes' />} />
					<Route path='furniture' element={<Page title='furniture' />} />
					<Route path='sport' element={<Page title='sport' />} />
					<Route path='electronics' element={<Page title='electronics' />} />
					<Route path='books' element={<Page title='books' />} />
					<Route path='stationery' element={<Page title='stationery' />} />
					<Route path='jewelry' element={<Page title='jewelry' />} />
					<Route path='products' element={<Page title='products' />} />
					<Route path='pet_supplies' element={<Page title='pet_supplies' />} />

					<Route path='account' element={<Account />} />
					<Route path='basket' element={<Basket />} />
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default App
