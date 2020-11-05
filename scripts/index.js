import Card from './card.js';

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

const popupProfile = document.querySelector('.popup_profile');
const popupAddImages = document.querySelector('.popup_add-images');
const profileButtonAddImages = document.querySelector('.profile__button-add-images'); 
const profileButton = document.querySelector('.profile__button');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupCloseAddImages = document.querySelector('.popup__close_add-images');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');
const popupCloseViewImage= document.querySelector('.popup__close_view-image');
const cardContainer = document.querySelector('.cards');
const nameImage = document.querySelector('.popup__input_type_image-name');
const linkImage = document.querySelector('.popup__input_type_image-link');
const popupViewImages = document.querySelector('.popup_view-images');
const buttonSave = popupProfile.querySelector('.popup__button_save'); 
const buttonCreate = popupAddImages.querySelector('.popup__button_create');

function closeEsc (evt) {
  if(evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc); 
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

function clearInputs (popup) {
  if(popup.classList.contains('popup_add-images')) {
    nameImage.value = '';
    linkImage.value = '';
  }
}

function clickCard(card) {
    const targetImage = card.querySelector('.card__image');
    const targetTitle = card.querySelector('.card__title');
    popupPicture.src = targetImage.src;
    popupPictureTitle.textContent = targetTitle.textContent;
    openPopup(popupViewImages);
  }

const renderCards = () => {
   const items = initialCards.map(item => getItems(item));
   cardContainer.append(...items);
}

const getItems = (item) => {
  const card = new Card(item, '#card').generateCard();
  card.querySelector('.card__image').addEventListener('click', () => {clickCard(card)});
  return card;
}

function findInputError (popup) {
  const arrayList = Array.from(popup.querySelectorAll('.popup__input'));
  arrayList.forEach((inputElement) => {
    hideInputError(popup, inputElement, selectors);
  });
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
}

function formSubmitImages (evt) {
  evt.preventDefault();
  const item = getItems({
    name: nameImage.value,
    link: linkImage.value
  });
  cardContainer.prepend(item);
  closePopup(popupAddImages);  
  clearInputs(popupAddImages);
}

profileButtonAddImages.addEventListener('click', function () {
  inactiveButton(buttonCreate, selectors);   
  clearInputs(popupAddImages);
  findInputError(popupAddImages);
  openPopup(popupAddImages);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  activeButton(buttonSave, selectors);
  findInputError(popupProfile);
  openPopup(popupProfile);
}); 

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup);
  }
}

popupProfile.addEventListener('click', closePopupOverlay);
popupAddImages.addEventListener('click', closePopupOverlay);
popupViewImages.addEventListener('click', closePopupOverlay);

popupCloseProfile.addEventListener('click', function () { 
  closePopup(popupProfile);
  findInputError(popupProfile);  
});  

popupCloseAddImages.addEventListener('click', function () {  
  closePopup(popupAddImages);
  clearInputs(popupAddImages);
  findInputError(popupAddImages);
});  

popupCloseViewImage.addEventListener('click', function () {  
  closePopup(popupViewImages);
});  

popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);

renderCards();

