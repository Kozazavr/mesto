import Popup from './Popup.js';
          
export default class PopupWithForm extends Popup {
  constructor({selectorPopup, submitForm}) {
    super(selectorPopup);  
    this._submitForm = submitForm; 
  }

  _getInputValues() {
    this._form = document.querySelector(this._selectorPopup);
    this._inputList = this._form.querySelectorAll('.popup__input'); 
    this._formValues = {}; 
    this._inputList.forEach(input => {  // добавляем в этот объект значения всех полей
      this._formValues[input.name] = input.value;
    });
    return this._formValues;  // возвращаем объект значений
  }

  setEventListener(popupForm) {
    super.setEventListener(popupForm);
    popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close(popupForm) {
    super.close(popupForm);
    const form = popupForm.querySelector('.popup__container');
    form.reset();
  }

}



 
  


