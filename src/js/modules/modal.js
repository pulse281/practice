export default function modal() {
    const submit = document.querySelector('.modal__btn'),
        modalWrapper = document.querySelector('.modal-wrapper'),
        openModal = document.querySelector('.open-modal-btn'),
        closeModal = document.querySelector('.modal__close');
    
    submit.addEventListener('click', (e) => {
        e.preventDefault();
    });

    openModal.addEventListener('click', (e) => {
        modalWrapper.classList.remove('hide');
    });

    document.addEventListener('click', (e) => {
        if (e.target == modalWrapper || e.target == closeModal) {
            hideModal();
        }
    });

    function hideModal() {
        modalWrapper.classList.add('hide');
    }

}