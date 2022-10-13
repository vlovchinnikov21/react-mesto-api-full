function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <div className="popup__handler">
          <img
            src={props.imgPath}
            alt={props.imgPath}
            className="popup__info-tooltip"
          />
          <h2 className="popup__heading popup__heading_type_tooltip">
            {props.title}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
