import React from 'react'
import { Link } from 'react-router-dom'
import styles from './StartPage.module.scss'

const StartPage = () => {
	return (
		<div className={styles.start_page}>
			<h1>
				Это стартовая страницы!
				<br />
				Добро пожаловать в TradeUnity!
			</h1>
			<h2>Чтобы перейти в каталог, нажмите на логотип или кнопку ниже.</h2>
			<Link to='catalog'>
				<button>В каталог!</button>
			</Link>
		</div>
	)
}

export default StartPage
