import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './scripts/card.js';
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

const addCardForm = addCardModal.querySelector('.popup__form')

// Поля профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// handlers
function handleEditProfile(evt) {
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value
    const name = evt.target.querySelector('.popup__input_type_name').value;
    const description = evt.target.querySelector('.popup__input_type_description').value;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileDescription.textContent = description;

    closeModal(editModal);

    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function handleAddCard(evt) {
    evt.preventDefault();

    const name = evt.target.querySelector('.popup__input_type_card-name').value;
    const link = evt.target.querySelector('.popup__input_type_url').value;

    let card = {
        name: name,
        link: link
    }

    cardsContainer.prepend(createCard(card, cardTemplate, handleLike, handleOpenCardModal));

    closeModal(addCardModal);
}

function handleLike(event) {
    console.log(event.target);
    event.target.classList.add('card__like-button_is-active');
}

function handleOpenCardModal(event) {
    imageModalImage.src = event.target.src;
    imageModalText.textContent = event.target.alt;

    openModal(imageModal);
}

// Вывести карточки на страницу
initialCards.forEach((item) => cardsContainer.append(createCard(item, cardTemplate, handleLike, handleOpenCardModal)));

// дефолтное значение полей профиля
profileNameInput.value = profileName.textContent;
profileDescriptionInput.value = profileDescription.textContent;

// открытие модальных окон
profileEditButton.addEventListener('click', () => openModal(editModal));
profileAddButton.addEventListener('click', () => openModal(addCardModal));

// закрытие модальных окон
editModal.querySelector('.popup__close').addEventListener('click', () => closeModal(editModal));
addCardModal.querySelector('.popup__close').addEventListener('click', () => closeModal(addCardModal));
imageModal.querySelector('.popup__close').addEventListener('click', () => closeModal(imageModal));

// ивенты форм
editProfileForm.addEventListener('submit', handleEditProfile);
addCardForm.addEventListener('submit', handleAddCard);