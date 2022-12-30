export class AutoComplete {
    constructor(inputId, { placeholder, data, renderItem, matches, onItemClick }) {
        this.inputElement = document.getElementById(inputId);
        this.inputElement.placeholder = placeholder;
        this.addListeners();
        this.focused = false;
        this.data = data;
        this.searchTerm = '';
        this.renderItem = renderItem;
        this.matches = matches;
        this.onItemClick = onItemClick;
        this.filteredList = [];
        this.attachDropdownToBody();
    }

    addListeners() {
        this.inputElement.addEventListener('input', this.onInput.bind(this));
        this.inputElement.addEventListener('focus', this.onInputClick.bind(this));
        this.inputElement.addEventListener('blur', this.onInputClick.bind(this));
    }

    attachDropdownToBody() {
        const { top, left, height } = this.inputElement.getBoundingClientRect();
        this.dropdown = document.createElement('ul');
        this.dropdown.classList.add('autocomplete-dropdown');
        this.dropdown.role = 'listbox';
        this.dropdown.style.width = this.inputElement.offsetWidth + 'px';
        this.dropdown.style.top = top + height + 'px';
        this.dropdown.style.left = left + 'px';
        this.dropdown.addEventListener('mousedown', function (e){
            if (e.target.classList.contains('autocomplete-listitem')) {
                const index = e.target.dataset.itemId;
                this.onItemClick(this.filteredList.at(+index), this.searchTerm);
            }
        }.bind(this));
        this.dropdown.appendChild(this.createListItems(this.data));
        this.inputElement.parentElement.insertBefore(this.dropdown, null);
        this.toggleDropdown(false);
    }

    toggleDropdown(show) {
        this.dropdown.hidden = !show;
    }

    updateDropdown() {
        this.dropdown.innerHTML = '';
        this.dropdown.appendChild(this.createListItems(this.matches(this.data, this.searchTerm)));
        this.toggleDropdown(true);
    }

    createListItems(items) {
        const fragment = document.createDocumentFragment();
        this.filteredList = items;
        if (!this.filteredList.length) {
            const p = document.createElement('p');
            p.innerText = 'No results';
            fragment.appendChild(p);
            return fragment;
        }
        items.forEach((data, i) => {
            const li = document.createElement('li');
            li.classList.add('autocomplete-listitem');
            li.dataset.itemId = i;
            li.role = 'option';
            li.innerHTML = this.renderItem(data);
            li.firstElementChild.style.pointerEvents = 'none';
            fragment.appendChild(li);
        });
        return fragment;
    }

    onInput(e) {
        this.searchTerm = e.target.value;
        this.updateDropdown();
    }

    onInputClick(e) {
        this.focused = e.type === 'focus';
        this.toggleDropdown(this.focused);
    }
}