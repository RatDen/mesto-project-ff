// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, cardDeleteCallback) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__image').alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    newCard.querySelector('.card__delete-button').addEventListener('click', () => cardDeleteCallback(newCard));
    return newCard;
}


// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => cardsContainer.append(createCard(item, deleteCard)));