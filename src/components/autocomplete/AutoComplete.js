export class AutoComplete {
    constructor(inputId, options) {
        this.inputElement = document.getElementById(inputId);
        this.inputElement.addEventListener('input', this.onInput);
    }

    onInput(e) {
        console.log(e)
    }
}