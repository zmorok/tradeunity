import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header/Header'
import Catalog from './Catalog/Catalog'
import Page from './Page/Page'
import Footer from './Footer/Footer'
import './root.css'

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' exact element={<Catalog />} />
				<Route path='/shoes' exact element={<Page title='shoes' />} />
				<Route path='/furniture' exact element={<Page title='furniture' />} />
				<Route path='/sport' exact element={<Page title='sport' />} />
				<Route
					path='/electronics'
					exact
					element={<Page title='electronics' />}
				/>
				<Route path='/books' exact element={<Page title='books' />} />
				<Route path='/stationery' exact element={<Page title='stationery' />} />
				<Route path='/jewelry' exact element={<Page title='jewelry' />} />
				<Route path='/products' exact element={<Page title='products' />} />
				<Route
					path='/pet_supplies'
					exact
					element={<Page title='pet_supplies' />}
				/>
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
