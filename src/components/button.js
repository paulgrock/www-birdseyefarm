import React from 'react'
import PropTypes from 'prop-types'

import styles from './button.module.css';
import { PassThrough } from 'stream';

const Button = ({ className, children, ...passThroughProps }) => {
	const Element = passThroughProps.href ? 'a' : 'button';
	const classes = className ? `${styles.button} ${className}` : styles.button;
	return <Element className={classes} {...passThroughProps}>{children}</Element>
}

Button.propTypes = {

}

export default Button
