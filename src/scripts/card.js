// Функция создания карточки
export function createCard(card, cardTemplate, likeCallback, openModalCallback) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const image = newCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    image.addEventListener('click', (e) => openModalCallback(e));
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__like-button').addEventListener('click', (e) => likeCallback(e));
    newCard.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(newCard));
    return newCard;
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
}