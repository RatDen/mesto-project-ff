import { deleteCard, saveLike, deleteLike } from './api';

// Функция создания карточки
export function createCard(card, cardTemplate, onDeleteCallback, likeCallback, openModalCallback, loginInfo) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const image = newCard.querySelector('.card__image');
    const likeButton = newCard.querySelector('.card__like-button');
    
    newCard.dataset.id = card._id;
    image.src = card.link;
    image.alt = card.name;
    image.addEventListener('click', (e) => openModalCallback(e));
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__like-counter').textContent = card.likes.length;
    const isLiked = card.likes.some(item => {return item._id == loginInfo.userId});
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', (e) => likeCallback(e, loginInfo));
    if (card.owner._id !== loginInfo.userId) {
        newCard.querySelector('.card__delete-button').remove();
    } else {
        newCard.querySelector('.card__delete-button').addEventListener('click', (evt) => onDeleteCallback(evt));
    }
    return newCard;
}

// Функция удаления карточки
export function handleDeleteCard(cardId, loginInfo=null) {
    if (loginInfo) {
        deleteCard(loginInfo, cardId);
    }
    document.querySelector(`.card[data-id="${cardId}"]`).remove();
}

// Функция лайка
export function handleLike(event, loginInfo) {
    const card = event.target.closest('.card');
    const likeCounter = card.querySelector('.card__like-counter');
    let res = null;

    if (event.target.classList.contains('card__like-button_is-active')) {
        res = deleteLike(loginInfo, card.dataset.id)
    } else {
        res = saveLike(loginInfo, card.dataset.id)
    }

    if (res) {
        res.then(card => {
            likeCounter.textContent = card.likes.length;
            event.target.classList.toggle('card__like-button_is-active');
        })
    }
}