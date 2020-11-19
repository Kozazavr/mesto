export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }

  _getPopup() {
    const popupElement = document
    .querySelector(this._selectorPopup)
    .content 
    return popupElement;
  }

  open(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));  
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
  }
}





