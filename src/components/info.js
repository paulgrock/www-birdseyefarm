import React from 'react';
import styles from './info.module.css'
import Title from './section-title';

const info = ({title, children}) => (
	<div className={styles.heading}>
		<Title className={styles.title}>{title}</Title>
		{children}
	</div>
)

export default info;
