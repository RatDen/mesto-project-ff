import { getFirstSibling } from './functions.js'

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