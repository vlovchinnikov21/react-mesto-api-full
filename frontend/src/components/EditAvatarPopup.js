import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          required
          ref={avatarRef}
        />
        <span className="popup__error popup__error-avatar"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
