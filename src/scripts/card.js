import { deleteCard, saveLike, deleteLike } from './api';

// Функция создания карточки
export function createCard(card, cardTemplate, onDeleteCallback, likeCallback, openModalCallback, userId) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const image = newCard.querySelector('.card__image');
    const likeButton = newCard.querySelector('.card__like-button');
    
    newCard.dataset.id = card._id;
    image.src = card.link;
    image.alt = card.name;
    image.addEventListener('click', (e) => openModalCallback(e));
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__like-counter').textContent = card.likes.length;
    const isLiked = card.likes.some(item => {return item._id == userId});
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', (e) => likeCallback(e, userId));
    if (card.owner._id !== userId) {
        newCard.querySelector('.card__delete-button').remove();
    } else {
        newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => onDeleteCallback(evt));
    }
    return newCard;
}

// Функция удаления карточки
export function handleDeleteCard(cardId) {
    deleteCard(cardId)
    .then(() => {
        document.querySelector(`.card[data-id="${cardId}"]`).remove();
    })
}

// Функция лайка
export function handleLike(event) {
    const card = event.target.closest('.card');
    const likeCounter = card.querySelector('.card__like-counter');

    const likeMethod = event.target.classList.contains('card__like-button_is-active') ? deleteLike : saveLike;

    likeMethod(card.dataset.id)
    .then(card => {
        likeCounter.textContent = card.likes.length;
        event.target.classList.toggle('card__like-button_is-active');
    })
}