import React, { useState } from 'react';
import AuthPage from './AuthPage';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === 'Email' ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <div className="register">
      <AuthPage
        formName="register"
        onSubmit={handleSubmit}
        title="Регистрация"
        btnText="Зарегистрироваться"
      >
        <div className="popup__input-container">
          <input
            type="email"
            id="email"
            name="Email"
            className="popup__input popup__input_type_login"
            placeholder="Email"
            required
            minLength="6"
            maxLength="40"
            onChange={handleChange}
            value={email || ''}
          />
          <span className="popup__error popup__error-user-name"></span>
        </div>
        <div className="popup__input-container">
          <input
            type="password"
            id="password"
            name="Password"
            className="popup__input popup__input_type_login"
            placeholder="Пароль"
            required
            minLength="6"
            maxLength="40"
            onChange={handleChange}
            value={password || ''}
          />
          <span className="popup__error popup__error-user-name"></span>
        </div>
      </AuthPage>
    </div>
  );
}
