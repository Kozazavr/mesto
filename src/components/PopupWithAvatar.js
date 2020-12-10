import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
          
export default class PopupWithAvatar extends PopupWithForm {
  constructor({selectorPopup, submitForm}) {
    super({selectorPopup, submitForm});  
    // this._submitForm = submitForm; 
    // this._container = this._openPopup.querySelector('.popup__container');
  }

  _getInputValues() {
    this._input = this._container.querySelector('.popup__input'); 
    // this._formValues = {}; 
    // this._inputList.forEach(input => {  // добавляем в этот объект значения всех полей
    //   this._formValues[input.name] = input.value;
    // });
    this._input.name = input.value;
    return this._formValues;
    
  }

  setEventListener() {
    super.setEventListener();
    this._openPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._container.reset();
  }
}



 
  


