const showInputError = (formElement, inputElement, errorMessage) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('popup__input_error-text');
}

const hideInputError = (formElement, inputElement) => {
  const inputError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error');
  inputError.classList.remove('popup__input_error-text');
  inputError.textContent = '';
}

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_inactive');
    buttonElement.setAttribute('disabled', 'secondAttribute');
  } else {
    buttonElement.classList.remove('popup__button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

enableValidation();


