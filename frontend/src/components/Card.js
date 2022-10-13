import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? '' : 'card__delete-button_hidden'
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : ''
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__description">
        <h3 className="card__text">{props.card.name}</h3>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
