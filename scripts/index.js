let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');
let profileButton = document.querySelector('.profile__button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupPlus = document.querySelector('.popup__plus');

function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
} 

function closePopup () {
    popup.classList.remove('popup_opened');
}  

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
}

profileButton.addEventListener('click', openPopup);
popupPlus.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);











