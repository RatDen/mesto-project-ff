import { getFirstSibling } from './functions.js'

export function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach(form => {
        const inputList = Array.from(form.querySelectorAll(config.inputSelector));
        const submitButton = form.querySelector(config.submitButtonSelector);

        // изменить состояние кнопки при загрузке
        toggleButtonState(inputList, submitButton)
    
        // валидация формы, изменнение состояния кнопки
        form.addEventListener('input', event => {
            checkInputValidity(event.target);
            toggleButtonState(inputList, submitButton)
        })
    })
}

export function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        hideInputError(input);
    })
    
    toggleButtonState(inputList, submitButton)
}

export function checkInputValidity(input) {
    // кастомные сообщения валидации
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }


    if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
    } else {
        hideInputError(input);
    }
}

export function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('button_inactive');
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('button_inactive');
      buttonElement.disabled = false;
    }
  }

export function showInputError(input, errorMessage) {
    const errorElement = getFirstSibling(input, '.popup__input-error_text');
    errorElement.textContent = errorMessage;
    input.classList.add('popup__input-error');
}

export function hideInputError(input) {
    const errorElement = getFirstSibling(input, '.popup__input-error_text');
    errorElement.textContent = '';
    input.classList.remove('popup__input-error');
}

export function hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
}