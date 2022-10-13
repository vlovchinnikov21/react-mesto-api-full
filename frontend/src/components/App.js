import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import * as auth from '../utils/auth';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import accept from '../images/confirm-img.svg';
import decline from '../images/decline-img.svg';

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [message, setMessage] = useState({ imgPath: '', text: '' });

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserProfile()
        .then((items) => {
          setCurrentUser(items);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((items) => {
          setCards(items);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      ).catch((err) => console.log(err));
    });
  }

  function handleCardDelete(card) {
    api
      .delete(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(items) {
    api
      .setUserProfile(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(items) {
    api
      .editUserAvatar(items)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(items) {
    api
      .addUserCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleAuth(password, email) {
    auth
      .authorize(password, email)
      .then((token) => {
        auth.getContent(token).then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        });
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        setEmail(res.data.email);
        setMessage({ imgPath: accept, text: 'Вы успешно зарегистрировались!' });
      })
      .catch(() =>
        setMessage({
          imgPath: decline,
          text: 'Что-то пошло не так! Попробуйте еще раз.',
        })
      )
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
        history.push('/');
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleEditAddPlaceClick}
            onCardClick={onCardClick}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
          <Route path="/sign-up">
            <Register
              isOpen={isEditProfilePopupOpen}
              onRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login isOpen={isEditProfilePopupOpen} onAuth={handleAuth} />
          </Route>
        </Switch>
        <Footer />
      </div>

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        title={message.text}
        imgPath={message.imgPath}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm
        name="delete-confirm"
        title="Вы уверены?"
        btnText="Да"
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
