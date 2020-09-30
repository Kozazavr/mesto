let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__name');
let popupOccupation = document.querySelector('.popup__occupation');
let profileButton = document.querySelector('.profile__button');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let popupPlus = document.querySelector('.popup__plus');

function eventPopup () {
  if (popup.classList.contains('popup_opened') === false) {
        popup.classList.add('popup_opened');
        popupName.value = profileName.textContent;
        popupOccupation.value = profileOccupation.textContent;

  } else {
    popup.classList.remove('popup_opened');
  }  
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let valueName = popupName.value;
  profileName.textContent = valueName;
  let valueOccupation = popupOccupation.value;
  profileOccupation.textContent = valueOccupation;
  eventPopup();
  
 }

profileButton.addEventListener('click', eventPopup);
popupPlus.addEventListener('click', eventPopup);
popup.addEventListener('submit', formSubmitHandler);











