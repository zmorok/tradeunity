import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import Icon from '../assets/Icon'
import styles from './Header.module.scss'

const NavFullscreen = () => {
	return (
		<nav className={styles.nav_fullscreen}>
			<Link to='/basket'>
				<div>
					<Icon
						name='cart-shopping'
						className='cart-shopping.svg'
						alt='cart-shopping.svg'
					/>
					<p>Корзина</p>
				</div>
			</Link>
			<Link to='/authorization'>
				<div>
					<Icon name='account' className='account.svg' alt='account.svg' />
					<p>Аккаунт</p>
				</div>
			</Link>
		</nav>
	)
}

const NavSidebar = () => {
	return (
		<nav className={styles.nav_sidebar}>
			<Icon name='burger-menu' className='burger-menu' alt='burger-menu.svg' />
			<div className={styles.sidebar_content}>
				<Icon name='close' className={styles.close} alt='close.svg' />
				<Link to='/basket'>
					<div>
						<Icon
							name='cart-shopping'
							className='cart-shopping.svg'
							alt='cart-shopping.svg'
						/>
						<p>Корзина</p>
					</div>
				</Link>
				<Link to='/authorization'>
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
			<Link to='/'>
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
