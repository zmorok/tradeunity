import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Icon from '../assets/Icon'
import styles from './Header.module.scss'
import { addItem } from '../redux/cartSlice'

const NavFullscreen = () => {
	return (
		<nav className={styles.nav_fullscreen}>
			<Link to='./basket'>
				<div>
					<Icon
						name='cart-shopping'
						className='cart-shopping.svg'
						alt='cart-shopping.svg'
					/>
					<p>Корзина</p>
				</div>
			</Link>
			<Link to='./account'>
				<div>
					<Icon name='account' className='account.svg' alt='account.svg' />
					<p>Аккаунт</p>
				</div>
			</Link>
		</nav>
	)
}

const NavSidebar = () => {
	// состояние для отображения бокового навигационного меню
	const [showSidebar, setShowSidebar] = useState(false)
	const handleToggleSidebar = () => {
		setShowSidebar(!showSidebar)
	}

	// автозакрытие бокового меню при смене страницы
	const location = useLocation()
	useEffect(() => {
		setShowSidebar(false)
	}, [location.pathname])

	return (
		<nav className={styles.nav_sidebar}>
			<button
				onClick={handleToggleSidebar}
				style={{ background: 'none', border: 'none' }}
			>
				<Icon
					name='burger-menu'
					className={styles.burger_menu}
					id='burger'
					alt='burger-menu.svg'
				/>
			</button>
			<div
				className={`${styles.sidebar_content} ${
					showSidebar ? styles.show : styles.hide
				}`}
				id='sidebar_content'
			>
				<span onClick={handleToggleSidebar} className={styles.close}>
					<Icon name='close' alt='close.svg' />
				</span>
				<Link to='./basket'>
					<div>
						<Icon
							name='cart-shopping'
							className='cart-shopping.svg'
							alt='cart-shopping.svg'
						/>
						<p>Корзина</p>
					</div>
				</Link>
				<Link to='./account'>
					<div>
						<Icon name='account' className='account.svg' alt='account.svg' />
						<p>Аккаунт</p>
					</div>
				</Link>
			</div>
		</nav>
	)
}

const SearchResult = ({
	result,
	addItemToCart,
	setSearchStr,
	setShowSearch,
}) => {
	const products = result.result
	const showSearch = result.showSearch

	const handleConfirmClick = item => {
		const currentItem = {
			name: item.name,
			creator: item.creator,
			price: item.price,
			img: item.img,
		}
		addItemToCart(currentItem)
		alert(`Товар "${item.name}" добавлен!`)

		setShowSearch(false)
		setSearchStr('')
	}

	return (
		<div className={`${styles.search_result} ${showSearch ? styles.show : ''}`}>
			{showSearch &&
				products.map((item, i) => (
					<div key={i} className={styles.search_result_item}>
						<img
							className={styles.search_result_item_img}
							src={item.img}
							alt={item.name}
						/>
						<div className={styles.search_result_item_details}>
							<p>{item.name}</p>
							<p>"{item.creator}"</p>
							<p>[{item.price} руб.]</p>
						</div>
						<button
							className={styles.search_result_item_button}
							onClick={() => handleConfirmClick(item)}
						>
							Заказать
						</button>
					</div>
				))}
		</div>
	)
}

const Header = ({ items, addItemToCart }) => {
	// отслеживание ширины браузера для условного рендеринга
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900)

	// состояния для строки поиска и массива найденных товаров
	const [searcStr, setSearchStr] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [showSearch, setShowSearch] = useState(false)

	const searchInputRef = useRef(null)

	// автозакрытие результатов поиска при смене страницы
	const location = useLocation()
	useEffect(() => {
		setSearchStr('')
		setShowSearch(false)
	}, [location.pathname])

	// хук useEffect для отслеживания ширины экрана
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 900)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// хук useEffect для обработки поиска
	useEffect(() => {
		const trimmedSearch = searcStr.trim()

		if (trimmedSearch) {
			const results = items.filter(item =>
				item.name.toLowerCase().includes(trimmedSearch.toLowerCase())
			)
			setSearchResult(results)
			setShowSearch(true)
		} else {
			setSearchResult([])
			setShowSearch(false)
		}
	}, [searcStr, items])

	const handleBlur = () => {
		if (
			searchInputRef.current &&
			searchInputRef.current.contains(document.activeElement)
		) {
			setShowSearch(false)
		}
	}

	const handleFocus = () => {
		if (searcStr.trim()) {
			setShowSearch(true)
		}
	}

	const handleScroll = () => {
		setShowSearch(false)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header>
			<Link to='/catalog'>
				<Icon name='logo' className={styles.logo} alt='logo.svg' />
			</Link>
			<div className={styles.search}>
				<input
					ref={searchInputRef}
					placeholder='Поиск'
					value={searcStr}
					onChange={e => setSearchStr(e.target.value)}
					onBlur={handleBlur}
					onFocus={handleFocus}
				/>
				<button className={styles.serach_button}>
					<Icon name='search' className='search.svg' alt='search.svg' />
				</button>
				{searcStr && (
					<SearchResult
						result={{ result: searchResult, showSearch: showSearch }}
						addItemToCart={addItemToCart}
						setSearchStr={setSearchStr}
						setShowSearch={setShowSearch}
					/>
				)}
			</div>
			{isSmallScreen ? <NavSidebar /> : <NavFullscreen />}
		</header>
	)
}

const mapStateToProps = state => {
	const itemsArrays = Object.values(state.goods.items.items)
	const urls = Array.from(Object.values(state.goods.urls.urls))
	const newItems = itemsArrays.map((items, i) => {
		return items.map(item => {
			const img = item.img
			return { ...item, img: urls[i] + img }
		})
	})

	const items = newItems.flat()

	return { items }
}

const mapDispatchToProps = dispatch => ({
	addItemToCart: item => dispatch(addItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
