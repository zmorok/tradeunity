import React, { useEffect, useRef } from 'react'
import store from '../redux/store'

import styles from './Page.module.scss'

const ruTitles = {
	books: 'Книги',
	electronics: 'Электроника',
	furniture: 'Мебель',
	jewelry: 'Ювелирные изделия',
	pet_supplies: 'Зоотовары',
	products: 'Продукты',
	shoes: 'Обувь',
	sport: 'Спорт',
	stationery: 'Канцелярия',
}

const Page = ({ title }) => {
	const ruT = ruTitles[title]
	const goods = store.getState().goods.items.items[title]
	const url = store.getState().goods.urls.urls[title]

	const ref = useRef(null)
	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])

	return (
		<div className={title + '-section'}>
			<h1 className={styles.h1} ref={ref}>
				{ruT}
			</h1>
			<main className={styles.main_current}>
				{goods.map((item, index) => (
					<div key={index} className={styles.div_item}>
						<img src={url + item.img} alt={item.name} />
						<h2>{item.name}</h2>
						<p>{item.creator}</p>
						<p>{item.price} руб.</p>
						<button className={styles.btn_buy}>Купить</button>
						{/* <p>{item.description}</p> */}
					</div>
				))}
			</main>
		</div>
	)
}

export default Page
