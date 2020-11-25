export default class Popup {
  constructor(selectorPopup) {
    this._openPopup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._openPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);  
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
      console.log('AAA');
    }
  }
  
  close() {
    this._openPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListener() {
    const closePopupButton = this._openPopup.querySelector('.popup__close');

    closePopupButton.addEventListener('click', () => {
      this.close();
    });

    this._openPopup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}



