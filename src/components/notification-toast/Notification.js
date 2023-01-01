class Toast {
    constructor(duration = 5000, type, text) {
        this.duration = duration;
        switch(type) {
            case 'success':
                this.toastElement = this.successToast(text);
                break;
            case 'error':
                this.toastElement = this.errorToast(text);
                break;
            case 'info':
                this.toastElement = this.infoToast(text);
                break;
            default:
                this.toastElement = this.successToast(text);
        }
    }

    getToastElement() {
        return this.toastElement;
    }

    createToastElement(type, text) {
        const li = document.createElement('li');
        li.classList.add(`toast-${type}`);
        li.innerText = text;
        return li;
    }

    successToast(text) {
        this.toastElement = this.createToastElement('success', text);
        this.hideToastAfterDuration();
        return this.toastElement;
    }

    hideToastAfterDuration() {
        const toast = this.toastElement;
        this.timer = setTimeout(() => {
            toast.classList.add('remove');
            this.toastElement.addEventListener('animationend', function handler() {
                toast.remove();
                toast.removeEventListener('animationend', handler);
            });
        }, this.duration);
    }

    errorToast(text) {
        this.toastElement = this.createToastElement('error', text);
        this.hideToastAfterDuration();
        return this.toastElement;
    }

    infoToast(text) {
        this.toastElement = this.createToastElement('info', text);
        this.hideToastAfterDuration();
        return this.toastElement;
    }
}

export class Notification {
    constructor({ position = 'top-right'}) {
        this.createRootElement(position);
    }

    createRootElement(position) {
        this.root = document.createElement('ul');
        this.root.classList.add('toast-root', position);
        document.body.appendChild(this.root);
    }

    success(text, options) {
        const toast = new Toast(options?.duration, 'success', text).getToastElement();
        this.show(toast, options);
    }

    show(toast, options) {
        if (this.root.firstElementChild && !options?.insertAtEnd) {
            this.root.insertBefore(toast, this.root.firstElementChild)
        } else {
            this.root.appendChild(toast);
        }
    }

    error(text, options) {
        const toast = new Toast(options?.duration, 'error', text).getToastElement();
        this.show(toast, options);
    }

    info(text, options) {
        const toast = new Toast(options?.duration, 'info', text).getToastElement();
        this.show(toast, options);
    }

}