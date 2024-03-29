import React, { Component } from 'react';
import { nanoid } from 'nanoid';
export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  loginInputId = nanoid();

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    const isDuplicate = this.props.contacts.some(
      contact =>
        contact.name.toLowerCase() === this.state.name.toLowerCase() ||
        contact.number === this.state.number
    );

    if (isDuplicate) {
      alert('Contact with the same name or number already exists!');
      return;
    }
    this.setState({ name: '', number: '' });

    if (this.props.onAddContact) {
      this.props.onAddContact(newContact);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              onChange={this.handleChange}
              type="text"
              name="name"
              value={this.state.name}
              required
            />
          </label>
          <label>
            Number
            <input
              onChange={this.handleChange}
              value={this.state.number}
              type="tel"
              name="number"
              required
            />
          </label>

          <button type="submit">Add contact</button>
        </form>
      </div>
    );
  }
}