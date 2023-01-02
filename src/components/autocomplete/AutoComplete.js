export class AutoComplete {
    constructor(inputId, { placeholder, data, renderItem, matches, onItemClick }) {
        this.inputElement = document.getElementById(inputId);
        this.inputElement.placeholder = placeholder;
        this.focused = false;
        this.data = data;
        this.searchTerm = '';
        this.renderItem = renderItem;
        this.matches = matches;
        this.onItemClick = onItemClick;
        this.filteredList = [];
        this.filteredListElements = [];
        this.currentSelectedListElement = null;
        
        this.attachDropdownToBody();
        this.addListeners();
    }

    addListeners() {
        this.inputElement.addEventListener('input', this.onInput.bind(this));
        this.inputElement.addEventListener('focus', this.onInputClick.bind(this));
        this.inputElement.addEventListener('blur', this.onInputClick.bind(this));

        // handle keyboard up/down/enter keypress behaviour
        this.inputElement.addEventListener('keydown', (e) => {
            if (!this.filteredList.length) {
                return;
            }
            
            if (e.key === 'ArrowDown' || e.keyCode === 40) {
                this.currentSelectedListElement = this.currentSelectedListElement ?
                    (this.currentSelectedListElement.nextElementSibling || this.currentSelectedListElement) 
                    : this.filteredListElements[0];
                this.currentSelectedListElement.previousElementSibling?.removeAttribute('item-selected');
                this.currentSelectedListElement.setAttribute('item-selected', 'true');
                this.currentSelectedListElement.scrollIntoView({ block: "end" });
            }

            if (e.key === 'ArrowUp' || e.keyCode === 38) {
                this.currentSelectedListElement.removeAttribute('item-selected');
                this.currentSelectedListElement = this.currentSelectedListElement.previousElementSibling || this.currentSelectedListElement;
                this.currentSelectedListElement.setAttribute('item-selected', 'true');
                this.currentSelectedListElement.scrollIntoView({ block: "end" });
            }

            
            if (e.key === 'Enter' || e.keyCode === 13) {
                this.onItemClick(this.filteredList[this.currentSelectedListElement.dataset.itemId], this.searchTerm);
            }
        })
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
                this.onItemClick(this.filteredList[+index], this.searchTerm);
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
        this.filteredListElements = [];
        this.currentSelectedListElement = null;
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
            this.filteredListElements.push(li);
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