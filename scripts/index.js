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
const cardContainer = document.querySelector('.cards');
const nameImage = document.querySelector('.popup__input_type_image-name');
const linkImage = document.querySelector('.popup__input_type_image-link');

function likeCardHeard (evt) {
  const targetEvent = evt.target;
  if(!targetEvent.classList.contains('card__like_target')) {
    targetEvent.classList.add('card__like_target');
  } else {
    targetEvent.classList.remove('card__like_target');
  }
}

initialCards.forEach((item) => {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);
  const likeListener = cardElement.querySelector('.card__like');  

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  likeListener.addEventListener('click', likeCardHeard);   
  cardContainer.append(cardElement);
  
});

function likeCardHeard (evt) {
  const targetEvent = evt.target;
  if(!targetEvent.classList.contains('card__like_target')) {
    targetEvent.classList.add('card__like_target');
  } else {
    targetEvent.classList.remove('card__like_target');
  }
}


function openPopupProfile () {
  popupProfile.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
} 

function openPopupAddImage () {
  popupAddImages.classList.add('popup_opened');
} 

function closePopupProfile () {
    popupProfile.classList.remove('popup_opened');
}  

function closePopupAddImages () {
  popupAddImages.classList.remove('popup_opened');
  nameImage.value = '';
  linkImage.value = '';
} 

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupProfile();
}

function formSubmitImages (evt) {
   evt.preventDefault();
   const cardTemplate = document.querySelector('#card').content;
   const cardElement = cardTemplate.cloneNode(true);
   const likeListener = cardElement.querySelector('.card__like');
  
   likeListener.addEventListener('click', likeCardHeard); 
   cardElement.querySelector('.card__title').textContent = nameImage.value;
   cardElement.querySelector('.card__image').src = linkImage.value;
   cardContainer.prepend(cardElement);
   closePopupAddImages ();
} 
   



profileButtonAddImages.addEventListener('click', openPopupAddImage);
profileButton.addEventListener('click', openPopupProfile);
popupCloseProfile.addEventListener('click', closePopupProfile);
popupCloseAddImages.addEventListener('click', closePopupAddImages);
popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);




