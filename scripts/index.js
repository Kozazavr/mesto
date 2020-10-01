let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');
let profileButton = document.querySelector('.profile__button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupPlus = document.querySelector('.popup__plus');

function eventPopup () {
  if (popup.classList.contains('popup_opened') === false) {
        popup.classList.add('popup_opened');
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;

  } else {
    popup.classList.remove('popup_opened');
  }  
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  eventPopup();
  
 }

profileButton.addEventListener('click', eventPopup);
popupPlus.addEventListener('click', eventPopup);
popup.addEventListener('submit', formSubmitHandler);











