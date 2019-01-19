import React from 'react'
import PropTypes from 'prop-types'
import Input from '../input';
import Button from '../button';
import styles from './contact.module.css';

const Contact = props => {
  return (
	<section id="contact" className={styles.container}>
		<form name="contact" netlify netlify-honeypot="bot-field" hidden>
			<input type="text" name="name" />
			<input type="email" name="email" />
			<textarea name="message"></textarea>
		</form>
		<h3>Contact Us</h3>
		<form action="">
			<input type="hidden" name="form-name" value="contact" />
			<Input placeholder="Name" type="text" name="name" />
			<Input placeholder="Email Address" type="email" name="email" />
			<textarea name="message"></textarea>
			<Button type="submit">Contact Us</Button>
		</form>
	</section>
  )
}

Contact.propTypes = {

}

export default Contact
