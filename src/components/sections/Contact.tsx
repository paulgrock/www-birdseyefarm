import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { z } from 'astro/zod';
import * as styles from './contact.module.css';
import * as sectionStyles from '../section-container.module.css';
import * as buttonStyles from '../button.module.css';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  botField: z.string().optional()
});

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

interface ContactState {
  name?: string;
  email?: string;
  message?: string;
  botField?: string;
  showModal: boolean;
  errors: string[];
}

export default class Contact extends Component<{}, ContactState> {
  state: ContactState = {
    errors: [],
    showModal: false
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name") || "",
        ...this.state
      } as Record<string, string>)
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
      <section id="contact" className={`${sectionStyles.container} ${styles.container}`}>
        <h3 className={styles.title}>Contact Us</h3>
        <form
          method="post"
          className={styles.form}
          data-netlify="true"
          name="contact"
          onSubmit={this.handleSubmit}
          netlify-honeypot="botField"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div hidden>
            <label>
              Don't fill this out:{" "}
              <input name="botField" onChange={this.handleChange} />
            </label>
          </div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={this.handleChange}
            className={styles.input}
          />
          <input
            placeholder="Email Address"
            type="email"
            name="email"
            onChange={this.handleChange}
            className={styles.input}
          />
          <textarea
            name="message"
            className={styles.textarea}
            onChange={this.handleChange}
            placeholder="Adopt a goat!"
          />
          <button type="submit" className={`${buttonStyles.button} ${styles.button}`}>Contact Us</button>
        </form>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Thank for submitting"
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={true}
          className={styles.modal}
          overlayClassName={styles.overlay}
          appElement={typeof document !== 'undefined' ? document.getElementById('contact') || undefined : undefined}
        >
          <p>Thanks for inquiring about our goats. We'll be in touch shortly!</p>
        </ReactModal>
      </section>
    );
  }
}
