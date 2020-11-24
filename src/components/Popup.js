export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  open(popupElement) {
    popupElement.classList.add('popup_opened');
    this.setEventListener(popupElement);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      const popupOpened = document.querySelector(this._selectorPopup);
      this.close(popupOpened);
    }
  }
  
  close(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListener(popupElement) {
    const closePopup = popupElement.querySelector('.popup__close');
    closePopup.addEventListener('click', () => {
      this.close(popupElement);
    });
    popupElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close(popupElement);
      }
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));  
  }
}



