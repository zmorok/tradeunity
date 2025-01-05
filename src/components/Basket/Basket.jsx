import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './Basket.module.scss'
import { removeItem, clearCart } from './../redux/cartSlice'

const Basket = ({ cart, removeCartItem, clearCart }) => {
	const [email, setEmail] = useState('')

	const totalPrice = cart
		.reduce((total, item) => total + item.price, 0)
		.toFixed(2)

	const handleRemove = item => {
		if (window.confirm('Удалить текущий товар?')) {
			removeCartItem(item)
		}
	}

	async function handleEmail(email) {
		setEmail('')
		if (!email) {
			alert('Введите адрес электронной почты!')
			return
		}
		const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.4; font-size: 14px;">
        <h1 style="background: #f4f4f4; padding: 8px; border-bottom: 1px solid #ddd; font-size: 18px; margin: 0 0 10px;">
            Ваш заказ
        </h1>
        ${cart
					.map(
						item => `
            <div style="border: 1px solid #ddd; padding: 8px; margin-bottom: 8px; display: flex; align-items: center;">
                <img src="https://zmorok.github.io/${item.img}" alt="${item.name}" 
                    style="width: 150px; height: 150px; object-fit: cover; border-radius: 3px; margin-right: 10px;"/>
                <div>
                    <h2 style="margin: 0; font-size: 14px; color: #333;">${item.name}</h2>
                    <p style="margin: 4px 0; font-size: 12px;">Цена: <strong>${item.price} руб.</strong></p>
                </div>
            </div>`
					)
					.join('')}
        <p style="margin-top: 15px; font-size: 14px;">
            Общая сумма: <strong>${totalPrice} руб.</strong>
        </p>
    </div>`

		try {
			const response = await fetch('http://localhost:5000/send-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					subject: 'Ваш заказ в TradeUnity',
					html: emailContent,
				}),
			})

			if (response.ok) {
				const result = await response.json()
				alert(result.message)
				clearCart()
			} else {
				console.error('Ошибка сервера', await response.text())
				alert('Ошибка отправки письма.')
			}
		} catch (error) {
			console.error('Ошибка:', error)
			alert('Не удалось отправить письмо.')
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
					<div className={styles.actions}>
						<button
							className={styles.button_clear}
							onClick={() => {
								if (window.confirm('Очистить корзину?')) clearCart()
							}}
						>
							Очистить корзину
						</button>
						<div className={styles.email_input_container}>
							<input
								type='email'
								placeholder='Ваш email для заказа'
								value={email}
								onChange={e => setEmail(e.target.value)}
								className={styles.email_input}
							/>
							<button
								className={styles.button_send}
								onClick={() => handleEmail(email)}
							>
								Подтвердить заказ
							</button>
						</div>
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
	clearCart: () => dispatch(clearCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
