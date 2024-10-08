import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal';
import * as yup from 'yup';
import Button from '../button';
import * as styles from './contact.module.css';
import Title from '../section-title';
import Section from  '../section-container';

import { navigateTo } from "gatsby-link";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
  botField: yup.string()
});

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Input = props => (
	<input {...props} className={styles.input}/>
)

ReactModal.setAppElement('#___gatsby');

export default class contact extends Component {
	static propTypes = {

	}

	state = {
		errors: []
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			// schema.validate(this.state).catch(err => {
			// 	this.setState({
			// 		errors: err.errors
			// 	});
			// })
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const form = e.target;
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({
				"form-name": form.getAttribute("name"),
				...this.state
			})
		})
			.then(this.handleOpenModal)
			.catch(error => alert(error));
	};

	handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

	render() {
		return (
			<Section id="contact" className={styles.container}>
				<Title className={styles.title}>Contact Us</Title>
				{/* {this.state.errors.length && (
					this.state.errors.map(err => <p>{err}</p>)
				)} */}
				<form method="post" className={styles.form} data-netlify="true" name="contact" onSubmit={this.handleSubmit} netlify-honeypot="botField">
					<input type="hidden" name="form-name" value="contact" />
					<div hidden>
						<label>
							Don’t fill this out:{" "}
							<input name="botField" onChange={this.handleChange} />
						</label>
					</div>
					<Input placeholder="Name" type="text" name="name" onChange={this.handleChange} />
					<Input placeholder="Email Address" type="email" name="email" onChange={this.handleChange} />
					<textarea name="message" className={styles.textarea} onChange={this.handleChange} placeholder="Adopt a goat!"></textarea>
					<Button type="submit" className={styles.button}>Contact Us</Button>
				</form>

				<ReactModal
           isOpen={this.state.showModal}
           contentLabel="Thank for submitting"
           onRequestClose={this.handleCloseModal}
					 shouldCloseOnOverlayClick={true}
					 className={styles.modal}
           overlayClassName={styles.overlay}
        >
					<p>Thanks for inquiring about our goats. We'll be in touch shortly!</p>
				</ReactModal>
			</Section>
		)
	}
}
