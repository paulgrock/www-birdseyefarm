import React from 'react'
import PropTypes from 'prop-types'

import styles from './button.module.css';

const Button = props => (
	<button className={styles.button} {...props}>{props.children}</button>
);

Button.propTypes = {

}

export default Button
