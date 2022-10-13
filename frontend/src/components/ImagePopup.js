import React from 'react';

function ImagePopup(props) {
  return (
      <section className={`popup popup_picture ${props.card ? 'popup_opened' : ''}`}>
        <div className="popup__picture-container">
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img alt={props.card ? props.card.name : ''} className="popup__image" src={props.card ? props.card.link : '#'} />
            <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
          </figure>
        </div>
      </section>
  );
}

export default ImagePopup;