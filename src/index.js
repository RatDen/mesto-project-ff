import './pages/index.css';
import { getUserProfile, getCards, saveUserProfile, saveCard, editUserProfileAvatar } from './scripts/api.js';
import { createCard, handleDeleteCard, handleLike } from './scripts/card.js';
import { openModal, closeModal, closeOnOverlayClick } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js'

const userInfo = {};

const FORM_SELECTORS = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: 'button[type="submit"]',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// buttons
const profileAvatarEdit = document.querySelector('.profile__image');
const profileAddButton = document.querySelector('.profile__add-button');
const profileNameEditButton = document.querySelector('.profile__edit-button');

// Модальные окна
const editProfileAvatarModal = document.querySelector('.popup_type_edit-profile-avatar');
const editProfileAvatarButton = editProfileAvatarModal.querySelector('.popup__button');

const editProfileNameModal = document.querySelector('.popup_type_edit-profile-name');
const editProfileNameButton = editProfileNameModal.querySelector('.popup__button');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardButton = addCardModal.querySelector('.popup__button');

const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalText = imageModal.querySelector('.popup__caption');

const confirmModal = document.querySelector('.popup_type_confirm');
const confirmModalButton = confirmModal.querySelector('.popup__button');

// Формы
const editProfileAvatarForm = editProfileAvatarModal.querySelector('.popup__form');
const editProfileAvatarInput = editProfileAvatarForm.querySelector('input');

const editProfileForm = editProfileNameModal.querySelector('.popup__form');
const profileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = editProfileForm.querySelector('.popup__input_type_description');

const addCardForm = addCardModal.querySelector('.popup__form');
const addCardFormInputs = addCardForm.querySelectorAll('input');

// Поля профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Поля формы добавления карт
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

// handlers
function handleEditProfileAvatar(evt) {
    evt.preventDefault();

    editProfileAvatarButton.textContent = 'Сохранение...';

    editUserProfileAvatar(editProfileAvatarInput.value)
    .then(user => {
        setUserProfile(user);
        closeModal(editProfileAvatarModal);
    })
    .catch((err) => { 
        console.log(err); 
    })
    .finally(() => {
        editProfileAvatarButton.textContent = 'Сохранить';
    })
}

function handleEditProfileName(evt) {
    evt.preventDefault();

    // Вставьте новые значения с помощью textContent
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;

    editProfileNameButton.textContent = 'Сохранение...';

    saveUserProfile({name: profileNameInput.value, about: profileDescriptionInput.value})
    .then(user => {
        setUserProfile(user);
        closeModal(editProfileNameModal);
    })
    .catch((err) => { 
        console.log(err); 
    })
    .finally(() => {
        editProfileNameButton.textContent = 'Сохранить';
    })
}

function handleAddCard(evt) {
    evt.preventDefault();

    const card = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }

    addCardButton.textContent = 'Сохранение...';

    saveCard(card)
    .then(card => {
        cardsContainer.prepend(createCard(card, cardTemplate, handleOpenConfirmModal, handleLike, handleOpenCardModal, userInfo.id));

        closeModal(addCardModal);

        addCardForm.reset();
        clearValidation(addCardModal, FORM_SELECTORS);
    })
    .catch((err) => { 
        console.log(err); 
    })
    .finally(() => {
        addCardButton.textContent = 'Сохранить';
    })
}

function handleOpenConfirmModal(evt) {
    evt.preventDefault();

    const card = evt.target.closest('.card');
    confirmModalButton.dataset.targetId = card.dataset.id;

    openModal(confirmModal);
}

function handleOpenCardModal(event) {
    imageModalImage.src = event.target.src;
    imageModalImage.alt = event.target.alt;
    imageModalText.textContent = event.target.alt;

    openModal(imageModal);
}

function setUserProfile(user) {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    userInfo.id = user._id;
}

// закрытие попапов по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', event => closeOnOverlayClick(event));
});

// открытие модальных окон
profileAvatarEdit.addEventListener('click', () => openModal(editProfileAvatarModal));
profileNameEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    clearValidation(editProfileNameModal, FORM_SELECTORS);
    openModal(editProfileNameModal);
});
profileAddButton.addEventListener('click', () => openModal(addCardModal));

// закрытие модальных окон
document.querySelectorAll('.popup__close').forEach(button => {
    button.addEventListener('click', evt => {
        closeModal(evt.target.closest('.popup'));
    })
})

// ивенты форм
editProfileAvatarButton.addEventListener('click', handleEditProfileAvatar)
editProfileForm.addEventListener('submit', handleEditProfileName);
addCardForm.addEventListener('submit', handleAddCard);

confirmModalButton.addEventListener('click', evt => {
    evt.preventDefault();

    handleDeleteCard(evt.target.dataset.targetId, userInfo.id);

    evt.target.dataset.targetId = '';

    closeModal(confirmModal);
})

// Конечная обработка контента

// Подключение валидации
enableValidation(FORM_SELECTORS);

// Загрузка профиля и карточек
Promise.all([
    getUserProfile(),
    getCards()

])
.then(([user, cards]) => {
    // Вывод данных о пользователе
    setUserProfile(user);

    // Вывод карточек
    cards.forEach(card => cardsContainer.append(createCard(card, cardTemplate, handleOpenConfirmModal, handleLike, handleOpenCardModal, userInfo.id)));
})
.catch((err) => { 
    console.log(err); 
})