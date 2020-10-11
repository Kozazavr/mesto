const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const popup = document.querySelector('.popup');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileButton = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupPlus = document.querySelector('.popup__plus');
const cardContainer = document.querySelector('.cards');

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

initialCards.forEach((item) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardContainer.prepend(cardElement);
});











