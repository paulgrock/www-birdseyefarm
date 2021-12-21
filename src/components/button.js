import React from 'react'
import PropTypes from 'prop-types'

import { button } from './button.module.css';

const Button = ({ className, children, ...passThroughProps }) => {
	const Element = passThroughProps.href ? 'a' : 'button';
	const classes = className ? `${button} ${className}` : button;
	return <Element className={classes} {...passThroughProps}>{children}</Element>
}

Button.propTypes = {

}

export default Button
