import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Header/Header'
import Catalog from './Catalog/Catalog'
import Page from './Page/Page'
import Footer from './Footer/Footer'

import './root.css'

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Catalog />} />
				<Route path='/shoes' element={<Page title='shoes' />} />
				<Route path='/furniture' element={<Page title='furniture' />} />
				<Route path='/sport' element={<Page title='sport' />} />
				<Route path='/electronics' element={<Page title='electronics' />} />
				<Route path='/books' element={<Page title='books' />} />
				<Route path='/stationery' element={<Page title='stationery' />} />
				<Route path='/jewelry' element={<Page title='jewelry' />} />
				<Route path='/products' element={<Page title='products' />} />
				<Route path='/pet_supplies' element={<Page title='pet_supplies' />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
