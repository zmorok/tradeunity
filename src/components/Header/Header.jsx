import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Icon from '../assets/Icon'
import styles from './Header.module.scss'

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

const Header = () => {
	// отслеживание ширины браузера для условного рендеринга
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 840)
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 840)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<header>
			<Link to='/catalog'>
				<Icon name='logo' className={styles.logo} alt='logo.svg' />
			</Link>
			<div className={styles.search}>
				<input placeholder='Search' />
				<button>
					<Icon name='search' className='search.svg' alt='search.svg' />
				</button>
			</div>
			{isSmallScreen ? <NavSidebar /> : <NavFullscreen />}
		</header>
	)
}

export default Header
