import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink(``);
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="card-description"
          name="name"
          className="popup__input popup__input_type_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className="popup__error popup__error-card-description"></span>
      </div>
      <div className="popup__input-container">
        <input
          type="url"
          id="card-image-link"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на изображение"
          required
          onChange={handleLinkChange}
          value={link || ''}
        />
        <span className="popup__error popup__error-card-image-link"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
