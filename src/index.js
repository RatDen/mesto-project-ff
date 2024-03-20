import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLike } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// buttons
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');

// модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');

const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalText = imageModal.querySelector('.popup__caption');

// формы
const editProfileForm = editModal.querySelector('.popup__form');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = editProfileForm.querySelector('.popup__input_type_description');

const addCardForm = addCardModal.querySelector('.popup__form');
const addCardFormInputs = addCardForm.querySelectorAll('input');

// Поля профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// поля формы добавления карт
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// handlers
function handleEditProfile(evt) {
    evt.preventDefault();

    // Вставьте новые значения с помощью textContent
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    closeModal(editModal);
}

function handleAddCard(evt) {
    evt.preventDefault();

    const card = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }

    cardsContainer.prepend(createCard(card, cardTemplate, deleteCard, handleLike, handleOpenCardModal));

    closeModal(addCardModal);

    addCardForm.reset();
}

function handleOpenCardModal(event) {
    imageModalImage.src = event.target.src;
    imageModalImage.alt = event.target.alt;
    imageModalText.textContent = event.target.alt;

    openModal(imageModal);
}

// Вывести карточки на страницу
initialCards.forEach((item) => cardsContainer.append(createCard(item, cardTemplate, deleteCard, handleLike, handleOpenCardModal)));

// закрытие попапов по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', event => {
        if (event.target === event.currentTarget) {
            closeModal(event.target);
        }
    })
}) 

// открытие модальных окон
profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(editModal);
});
profileAddButton.addEventListener('click', () => openModal(addCardModal));

// закрытие модальных окон
editModal.querySelector('.popup__close').addEventListener('click', () => closeModal(editModal));
addCardModal.querySelector('.popup__close').addEventListener('click', () => closeModal(addCardModal));
imageModal.querySelector('.popup__close').addEventListener('click', () => closeModal(imageModal));

// ивенты форм
editProfileForm.addEventListener('submit', handleEditProfile);
addCardForm.addEventListener('submit', handleAddCard);