import React from 'react';

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form
          name={`popup-${props.name}`}
          className="popup__form"
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.btnText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
