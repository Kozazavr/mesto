export default class FormValidate {
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
    this._toggleButtonState(inputList, buttonElement); 
    inputList.forEach((inputElement) => {
      this._hideInputError(form, inputElement);
      inputElement.addEventListener('input', () => {
        this._isValid(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      this._inactiveButton(buttonElement);
    } else {
      this._activeButton(buttonElement);
    }
  }

  _isValid(form, inputElement) {
    if(!inputElement.validity.valid) {
      const messageError = inputElement.validationMessage;
      this._showInputError(form, inputElement, messageError);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _inactiveButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'secondAttribute');
  }

  _activeButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _showInputError(form, inputElement, messageError) {
    const inputError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = messageError;
    inputError.classList.add(this._errorClass);
  }

  _hideInputError(form, inputElement) {
    const inputError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = ' ';  
  }
}

export {FormValidate};
