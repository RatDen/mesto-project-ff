import { toggleButtonState, checkInputValidity } from "./form";

export function enableValidation(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const submitButton = form.querySelector('button[type="submit"]');

    // изменить состояние кнопки при загрузке
    toggleButtonState(inputList, submitButton)
    
    // валидация формы, изменнение состояния кнопки
    form.addEventListener('input', event => {
        checkInputValidity(event.target);
        toggleButtonState(inputList, submitButton)
    })
}

export function clearValidation(form) {
    const inputList = Array.from(form.querySelectorAll('input'));
    const submitButton = form.querySelector('button[type="submit"]');

    inputList.forEach(input => {
        input.classList.remove('popup__input-error')
    })
    
    toggleButtonState(inputList, submitButton)
}