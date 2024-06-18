import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../assets/Icon'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer>
			<div className={styles.footer_container}>
				<div className={styles.footer_section}>
					<h3>О нас</h3>
					<p>
						Наш маркетплейс предоставляет уникальные возможности для покупки и
						продажи товаров.
					</p>
				</div>
				<div className={styles.footer_section}>
					<h3>Контакты</h3>
					<ul>
						<li>Телефон: +375-XX-XXX-XX-XX</li>
						<li>Email: example@email.com</li>
						<li>Адрес: ул. Примерная, д. 123, г. Примерный, Беларусь</li>
					</ul>
				</div>
				<div className={styles.footer_section}>
					<h3>Полезные ссылки</h3>
					<ul className={styles.useful_links}>
						<li>
							<Link to='#'>Помощь</Link>
						</li>
						<li>
							<Link to='#'>Правила использования</Link>
						</li>
						<li>
							<Link to='#'>Конфиденциальность</Link>
						</li>
						<li>
							<Link to='#'>Условия использования</Link>
						</li>
					</ul>
				</div>
				<div className={styles.footer_section}>
					<h3>Наши соцсети</h3>
					<div className={styles.social_nets}>
						<div>
							<Link target='_blank' to='https://vk.com/id420508717'>
								<Icon name='vk' alt='vk.svg' />
							</Link>
						</div>
						<div>
							<Link target='_blank' to='https://github.com/zmorok'>
								<Icon name='github' alt='github.svg' />
							</Link>
						</div>
						<div>
							<Link target='_blank' to='https://www.youtube.com/'>
								<Icon name='youtube' alt='youtube.svg' />
							</Link>
						</div>
						<div>
							<Link target='_blank' to='https://www.facebook.com'>
								<Icon name='facebook' alt='facebook' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
