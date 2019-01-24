import React from 'react'
import PropTypes from 'prop-types'
import Input from '../input';
import Button from '../button';
import styles from './contact.module.css';
import Title from '../section-title';
import Section from  '../section-container'

const Contact = props => {
  return (
	<Section id="contact" className={styles.container}>
		<form name="contact" netlify netlify-honeypot="bot-field" hidden>
			<input type="text" name="name" />
			<input type="email" name="email" />
			<textarea name="message"></textarea>
		</form>

		<Title className={styles.title}>Contact Us</Title>
		<form action="" className={styles.form}>
			<input type="hidden" name="form-name" value="contact" />
			<Input placeholder="Name" type="text" name="name" />
			<Input placeholder="Email Address" type="email" name="email" />
			<textarea name="message"></textarea>
			<Button type="submit" className={styles.button}>Contact Us</Button>
		</form>
	</Section>
  )
}

Contact.propTypes = {

}

export default Contact
