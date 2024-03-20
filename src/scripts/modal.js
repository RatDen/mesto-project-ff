export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    window.addEventListener('keydown', closeOnEsc);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closeOnEsc);;
}

function closeOnEsc(event) {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}

function closeOnOverlayClick(modal, event) {
    if (event.target === modal) {
        closeModal(modal);
    }
}