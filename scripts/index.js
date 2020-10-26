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

const cardTemplate = document.querySelector('#card').content;
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
const popupCloseViewImage= document.querySelector('.popup__close_view-image');
const cardContainer = document.querySelector('.cards');
const nameImage = document.querySelector('.popup__input_type_image-name');
const linkImage = document.querySelector('.popup__input_type_image-link');
const popupViewImages = document.querySelector('.popup_view-images');
const popupPicture = document.querySelector('.popup__picture');
const popupPictureTitle = document.querySelector('.popup__picture-title');

const buttonSave = popupProfile.querySelector('.popup__button_save'); 
const buttonCreate = popupAddImages.querySelector('.popup__button_create');

function likeCardHeard (evt) {
  const targetEvent = evt.target;
  targetEvent.classList.toggle('card__like_target');
}

function deleteCard (evt) {
  evt.target.closest('.card').remove();
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}
 
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function clickCardImage (evt) {
  const targetEvent = evt.target;
  popupPicture.src = targetEvent.src;
  const reseveTitleCard = targetEvent.parentElement;
  reseveTitleCard.querySelector('.card__title');
  popupPictureTitle.textContent = reseveTitleCard.textContent;
  openPopup(popupViewImages);
  closeEsc(popupViewImages);
  closePopupOverlay(popupViewImages);
}

const renderCards = () => {
  const items = initialCards.map(element => getItems(element));
  cardContainer.append(...items);
}

const getItems = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const likeListener = cardElement.querySelector('.card__like');  
  const cardDeleteListener = cardElement.querySelector('.card__recycle-bin');  
  const cardImage = cardElement.querySelector('.card__image'); 

  cardImage.src = data.link;
  cardElement.querySelector('.card__title').textContent = data.name;

  likeListener.addEventListener('click', likeCardHeard);   
  cardDeleteListener.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', clickCardImage); 
    
  return cardElement;
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
  nameImage.value = '';
  linkImage.value = '';
  buttonCreate.classList.add('popup__button_inactive');
  buttonCreate.setAttribute('disabled', 'secondAttribute');
}

profileButtonAddImages.addEventListener('click', function () {  
  openPopup(popupAddImages);
  closeEsc(popupAddImages);
  closePopupOverlay(popupAddImages);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  buttonSave.classList.remove('popup__button_inactive'); /// ИСПРАВИТЬ!!!
  buttonSave.removeAttribute('disabled');                ///  ИСПРАВИТЬ!!!
  openPopup(popupProfile);
  closeEsc(popupProfile);
  closePopupOverlay(popupProfile);
}); 

const closeEsc = (popup) => {
  document.addEventListener('keydown', function(evt) {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

const closePopupOverlay = (popup) => {
  document.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

popupCloseProfile.addEventListener('click', function () {   
  closePopup(popupProfile);
});  

popupCloseAddImages.addEventListener('click', function () {  
  closePopup(popupAddImages);
  nameImage.value = '';
  linkImage.value = '';
});  

popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);
popupCloseViewImage.addEventListener('click', function () {  
  closePopup(popupViewImages);
});  

renderCards();




