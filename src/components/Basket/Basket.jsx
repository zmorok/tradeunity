import React from 'react'
import { connect } from 'react-redux'
import styles from './Basket.module.scss'
import { removeItem } from './../redux/cartSlice'

const Basket = ({ cart, removeCartItem }) => {
	const totalPrice = cart.reduce((total, item) => total + item.price, 0)

	const handleRemove = item => {
		if (window.confirm('Удалить текущий товар?')) {
			removeCartItem(item)
		}
	}

	return (
		<div className={styles.basket}>
			{cart.length !== 0 ? (
				<>
					<h1 className={styles.basket_title}>
						Корзина:{' '}
						<span className={styles.total_price}>{totalPrice} руб.</span>
					</h1>
					<div className={styles.basket_items}>
						{cart.map((item, i) => (
							<div key={i} className={styles.basket_item}>
								<img
									src={item.img}
									alt={item.name}
									className={styles.item_image}
								/>
								<div className={styles.item_details}>
									<h2 className={styles.item_name}>{item.name}</h2>
									<p className={styles.item_creator}>
										Создатель: {item.creator}
									</p>
									<p className={styles.item_price}>{item.price} руб.</p>
								</div>
								<button
									className={styles.button_remove}
									onClick={() => handleRemove(item)}
								>
									Удалить
								</button>
							</div>
						))}
					</div>
				</>
			) : (
				<h1 className={styles.emptyMessage}>
					Корзина пуста.
					<br />
					Добавьте товары из каталога!
				</h1>
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	cart: state.cart.items,
})

const mapDispatchToProps = dispatch => ({
	removeCartItem: item => dispatch(removeItem(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
