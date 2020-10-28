const selectors = {
  formSelector: '.popup__container',  
  inputSelector: '.popup__input',    
  submitButtonSelector: '.popup__button',  
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',  
  errorClass: 'popup__input_error-text'
}


const showInputError = (formElement, inputElement, errorMessage, rest) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(rest.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(rest.errorClass);
}

const hideInputError = (formElement, inputElement, rest) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(rest.inputErrorClass);
  inputError.classList.remove(rest.errorClass);
  inputError.textContent = ' ';  
}

const isValid = (formElement, inputElement, rest) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function inactiveButton(buttonElement, rest) {
  buttonElement.classList.add(rest.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'secondAttribute');
}

function activeButton(buttonElement, rest) {
  buttonElement.classList.remove(rest.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, rest) => {
  if(hasInvalidInput(inputList)) {
    inactiveButton(buttonElement, rest);
  } else {
    activeButton(buttonElement, rest);
  }
}


const setEventListeners = (formElement, rest) => {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest); 
  inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
}

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
   formList.forEach((formElement, i) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  setEventListeners(formElement, rest);
  });
}

enableValidation(selectors);

