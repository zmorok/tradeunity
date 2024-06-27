import React, { useState } from 'react'
import Icon from '../assets/Icon'
import { Link } from 'react-router-dom'

import styles from './Account.module.scss'

const Account = () => {
	// увидеть пароль при регистрации/входе
	const [passwordVisible, setPasswordVisible] = useState(false)
	const handleVisibility = () => {
		setPasswordVisible(!passwordVisible)
	}

	return (
		<div className={styles.account_form}>
			<div className={styles.form_box}>
				<div className={styles.form_value}>
					<form action=''>
						<h2>Войти в аккаунт</h2>
						<div className={styles.inputbox}>
							<Icon
								name='mail-outline'
								className={styles.icon}
								alt='mail-outline.svg'
							/>
							<input type='text' id='login_text' required />
							<label htmlFor='login_text'>Имя</label>
						</div>
						<div className={styles.inputbox}>
							<Icon
								name='lock-closed'
								className={styles.icon}
								alt='lock-closed.svg'
							/>
							<input
								type={passwordVisible ? 'text' : 'password'}
								id='passwordInput'
								required
							/>
							<label htmlFor='passwordInput'>Пароль</label>
							<span
								className={styles.toggle_password}
								onClick={handleVisibility}
							>
								<Icon
									name={passwordVisible ? 'visibility' : 'visibility-off'}
									alt='visibility-off.svg'
									id='visibility'
								/>
							</span>
						</div>
						<div className={styles.forget}>
							<div className={styles.forget_checkbox}>
								<input type='checkbox' id='checkbox_forget' />
								<label htmlFor='checkbox_forget'>Остаться в системе</label>
							</div>
							<div className={styles.forget_password}>
								<Link>Забыли пароль?</Link>
							</div>
						</div>
						<button className={styles.btn_login}>Войти</button>
						<div className={styles.register}>
							<p>
								У вас нет аккаунта? <Link> Зарегистрироваться</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Account
