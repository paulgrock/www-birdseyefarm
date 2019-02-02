import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button';
import styles from './contact.module.css';
import Title from '../section-title';
import Section from  '../section-container';


const Input = props => (
	<input {...props} className={styles.input}/>
)

const Contact = props => {
  return (
	<Section id="contact" className={styles.container}>
		<Title className={styles.title}>Contact Us</Title>
		<form method="post" className={styles.form} data-netlify="true" name="contact">
			<input type="hidden" name="form-name" value="contact" />
			<Input placeholder="Name" type="text" name="name" />
			<Input placeholder="Email Address" type="email" name="email" />
			<textarea name="message" className={styles.textarea}></textarea>
			<Button type="submit" className={styles.button}>Contact Us</Button>
		</form>
	</Section>
  )
}

Contact.propTypes = {

}

export default Contact
