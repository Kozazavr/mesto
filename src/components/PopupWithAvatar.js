import Popup from './Popup.js';
          
export default class PopupWithAvatar extends Popup {
  constructor({selectorPopup, submitForm}) {
    super(selectorPopup);  
    this._submitForm = submitForm;
    this._container = this._openPopup.querySelector('.popup__container');
  }

  _getInputValue() {
    this._input = this._container.querySelector('.popup__input'); 
    return this._input.value;
  }

  setEventListener() {
    super.setEventListener();
    this._openPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValue());
    });
  }

  close() {
    super.close();
    this._container.reset();
  }
}



 
  


