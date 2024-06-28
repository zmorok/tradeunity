// Page.jsx
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import store from '../redux/store'
import styles from './Page.module.scss'
import { addItem } from '../redux/cartSlice'

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

const Page = ({ title, addItemToCart }) => {
	const ruT = title && ruTitles[title]
	const goods = store.getState().goods.items.items[title]
	const url = store.getState().goods.urls.urls[title]

	const ref = useRef(null)
	useEffect(() => {
		if (ref.current) {
			ref.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [])

	useEffect(() => {
		const handleIntersection = entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add(styles.div_show)
				}
			})
		}

		const observer = new IntersectionObserver(handleIntersection, {
			threshold: [0.5],
		})

		const items = document.querySelectorAll(`.${styles.div_item}`)
		items.forEach(item => {
			observer.observe(item)
		})

		return () => {
			items.forEach(item => {
				observer.unobserve(item)
			})
		}
	}, [])

	const [modalContent, setModalContent] = useState(null)
	const handleModalOnClick = (item, index) => () => {
		setModalContent(
			<div className={styles.modal_content} onClick={e => e.stopPropagation()}>
				<div className={styles.close_btn} onClick={handleCloseModal}>
					&#10006;
				</div>
				<div key={index} className={styles.current_item}>
					<img src={`${url + item.img}`} alt={item.name} />
					<h2>{item.name}</h2>
					<p className='product_desc'>{item.description}</p>
					<p className='product_price'>{item.price} руб.</p>
					<button
						id='confirm_btn'
						className={styles.confirm_btn}
						onClick={() => handleConfirmClick(item)}
					>
						Заказать
					</button>
				</div>
			</div>
		)

		const modal = document.getElementById('modal')
		modal.style.display = 'flex'
		modal.classList.remove(styles.hide)
		modal.classList.add(styles.show)

		document.body.classList.add(styles.scroll_lock)

		setTimeout(() => {
			modal.scrollTop = 0
		}, 50)
	}

	const handleCloseModal = () => {
		const modal = document.getElementById('modal')
		modal.classList.remove(styles.show)
		modal.classList.add(styles.hide)

		document.body.classList.remove(styles.scroll_lock)

		setTimeout(() => {
			modal.style.display = 'none'
			setModalContent(null)
		}, 280)
	}

	const handleConfirmClick = item => {
		const currentItem = {
			name: item.name,
			creator: item.creator,
			price: item.price,
			img: url + item.img,
		}
		addItemToCart(currentItem)
		alert(`Товар "${item.name}" заказан!`)
	}

	return (
		<div className={`${title}_section`}>
			<div id='modal' className={styles.modal} onClick={handleCloseModal}>
				{modalContent}
			</div>
			<h1 className={styles.h1} ref={ref}>
				{ruT}
			</h1>
			<main className={styles.main_current}>
				{goods.map((item, index) => (
					<div key={index} className={styles.div_item}>
						<img src={url + item.img} alt={item.name} />
						<h2>{item.name}</h2>
						<p>"{item.creator}"</p>
						<p>{item.price} руб.</p>
						<button
							className={styles.btn_buy}
							onClick={handleModalOnClick(item, index)}
						>
							Купить
						</button>
					</div>
				))}
			</main>
		</div>
	)
}

const mapDispatchToProps = dispatch => ({
	addItemToCart: item => dispatch(addItem(item)),
})

export default connect(null, mapDispatchToProps)(Page)
