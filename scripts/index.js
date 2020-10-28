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

function closeEsc (evt) {
  if(evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc); 
  inactiveButton(buttonCreate, selectors); 
}

function clearInputs (popup) {
  if(popup.classList.contains('popup_add-images')) {
    nameImage.value = '';
    linkImage.value = '';
  }
}
 
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  // searchInputError(popup, selectors);
  clearInputs(popupAddImages);
}

function clickCard(cardImage, cardTitle) {
  popupPicture.src = cardImage.src;
  popupPictureTitle.textContent = cardTitle.textContent;
  openPopup(popupViewImages);
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
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  
  likeListener.addEventListener('click', likeCardHeard);   
  cardDeleteListener.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => clickCard (cardImage, cardTitle));
    
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
}

profileButtonAddImages.addEventListener('click', function () {  
  openPopup(popupAddImages);
});  

profileButton.addEventListener('click', function () {  
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  activeButton(buttonSave, selectors);
  openPopup(popupProfile);
}); 

function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup);
  }
}

document.addEventListener('click', closePopupOverlay);
popupCloseProfile.addEventListener('click', function () {   
  closePopup(popupProfile);
});  

popupCloseAddImages.addEventListener('click', function () {  
  closePopup(popupAddImages);
});  

popupProfile.addEventListener('submit', formSubmitHandler);
popupAddImages.addEventListener('submit', formSubmitImages);
popupCloseViewImage.addEventListener('click', function () {  
  closePopup(popupViewImages);
});  

renderCards();




