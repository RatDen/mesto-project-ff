export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    window.addEventListener('keydown', closeOnEsc);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closeOnEsc);;
}

export function closeOnOverlayClick(event) {
    if (event.target === event.currentTarget) { 
        closeModal(event.target); 
    }
}

function closeOnEsc(event) {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}