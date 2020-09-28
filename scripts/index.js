let popup = document.querySelector('.popup');
let popup__name = document.querySelector('.popup__name');
let popup__occupation = document.querySelector('.popup__occupation');
let profile__button = document.querySelector('.profile__button');
let profile__name = document.querySelector('.profile__name');
let profile__occupation = document.querySelector('.profile__occupation');
let popup__plus = document.querySelector('.popup__plus');

function openPopup () {
  popup.classList.toggle('popup_opened');
  popup__name.value = profile__name.textContent;
  popup__occupation.value = profile__occupation.textContent;
}

profile__button.addEventListener('click', openPopup);


function closePopup () {
  popup.classList.toggle('popup_opened');
}

popup__plus.addEventListener('click', closePopup);


 function formSubmitHandler (evt) {
    evt.preventDefault();
    let valueName = popup__name.value;
    profile__name.textContent = valueName;
    let valueOccupation = popup__occupation.value;
    profile__occupation.textContent = valueOccupation;
    closePopup();
  
 }

popup.addEventListener('submit', formSubmitHandler);










