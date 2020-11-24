export default class FormValidator {
  constructor(selectors, popup) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._popup = popup;
  }

  enableValidation() {
    const form = this._popup;
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(form);
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      this.inactiveButton(buttonElement);
    } else {
      this.activeButton(buttonElement);
    }
  }

  _isValid(form, inputElement) {
    if(!inputElement.validity.valid) {
      const messageError = inputElement.validationMessage;
      this._showInputError(form, inputElement, messageError);
    } else {
      this.hideInputError(form, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  inactiveButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'secondAttribute');
  }

  activeButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _showInputError(form, inputElement, messageError) {
    const inputError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = messageError;
    inputError.classList.add(this._errorClass);
  }

  hideInputError(form, inputElement) {
    if(inputElement === undefined) {
      const inputList = form.querySelectorAll(this._inputSelector);
      inputList.forEach((item) => {
        this.hideInputError(form, item);
      }); 
    } else {
      const inputError = form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      inputError.classList.remove(this._errorClass);
      inputError.textContent = ' ';  
    }
  }
}
console.log('AAA');
