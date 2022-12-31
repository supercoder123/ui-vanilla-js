export class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        this.modal.dataset.modalHidden = "true";
        this.addListeners();
    }

    addListeners() {
        this.modal.addEventListener('click', (e) => {
            if (e.target.parentElement.classList.contains('modal-container')) {
                this.close();
            }
        });
        this.modal.querySelectorAll('[data-close]').forEach(element => {
            element.addEventListener('click', () => this.close());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                this.close();
            }
        })
    }

    open() {
        this.modal.style.display = 'block';
        this.modal.dataset.modalHidden = "false";
    }

    close() {
        const modal = this.modal;
        this.modal.dataset.modalHidden = "true";
        this.modal.addEventListener('animationend', function handler() {
            modal.style.display = 'none';
            modal.removeEventListener('animationend', handler, false);
        }, false);
    }
}