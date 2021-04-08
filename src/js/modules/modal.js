export default function modal() {
    const forms = document.querySelectorAll('form'),
        modal = document.querySelector('.modal'),
        modalDialog = document.querySelector('.modal__dialog'),
        openModal = document.querySelector('.open-modal-btn'),
        closeModal = document.querySelector('.modal__close');

    forms.forEach(form => {
        bindData(form);
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && !modal.classList.contains('hide')) {
            hideModal();
        }
    });

    openModal.addEventListener('click', (e) => {
        showModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target == closeModal) {
            hideModal();
        }
    });

    function showModal() {
        modal.classList.remove('hide');
    }

    function hideModal() {
        modal.classList.add('hide');
    }

    const postData = async (url,  data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data
        });

        return res; 
    };

    function bindData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

        const messageText = {
            active: '',
            load: 'Загрузка...',
            error: 'Произошла ошибка',
            thanks: 'Спасибо скоро мы с вами свяжимся!'
        };
        const message = document.createElement('div'),
        messageLoad = document.createElement('div');

        modalDialog.append(messageLoad);
        messageLoad.classList.add('modal__header');
        messageLoad.innerHTML = messageText.load;


        function thanksMessage(msg) {
            messageLoad.remove();
            modalDialog.classList.add('hide');
            modal.append(message);
            message.classList.add('modal__dialog');

            message.innerHTML = msg;

            setTimeout(() => {
                hideModal();
                modalDialog.classList.remove('hide');
                message.remove();
            }, 2000);
            
        }
        
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(() => thanksMessage(messageText.thanks))
        .catch(() => thanksMessage(messageText.error))
        .finally(() => form.reset());

    });
}

}