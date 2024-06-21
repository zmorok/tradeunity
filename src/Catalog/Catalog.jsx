// Catalog.js
import React from 'react'
import { Link } from 'react-router-dom'

import sections from './sections'
import styles from './Catalog.module.scss'

function Catalog() {
	return (
		<>
			<>
				<h1>Каталог</h1>
			</>
			<main className={styles.main_sections}>
				{sections.map(section => (
					<div className={styles.div_section} key={section.className}>
						<img src={section.src} alt={section.alt} />
						<Link to={'/' + section.className}>{section.label}</Link>
					</div>
				))}
			</main>
		</>
	)
}

export default Catalog
