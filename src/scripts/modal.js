export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    window.addEventListener('keydown', closeOnEsc.bind(null, modal));
    modal.addEventListener('click', closeOnOverlayClick.bind(null, modal));
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', closeOnEsc);
    modal.removeEventListener('click', closeOnOverlayClick);
    modal.querySelectorAll('input').forEach(input => {input.value = ''});
}

function closeOnEsc(modal, event) {
    if (event.key === 'Escape') {
        closeModal(modal);
    }
}

function closeOnOverlayClick(modal, event) {
    if (event.target === modal) {
        closeModal(modal);
    }
}