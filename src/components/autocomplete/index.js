import { AutoComplete } from './AutoComplete';
import './styles.css';
import '../../styles.css';

fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((res) => {
    const autocomplete2 = new AutoComplete('my-search-2', {
        data: res,
        placeholder: 'Async search by name',
        matches: (data, searchTerm) => {
            return data.filter(data => data.name.toLowerCase().includes(searchTerm));
        },
        renderItem: (data) => {
            return `
                <div class="user-list-item">
                    <span class="name">${data.name}</span>
                    <span class="username">Username: ${data.username}</span>
                </div>
            `;
        },
        onItemClick: (dataItem, searchTerm) => {
            console.log(dataItem);
            document.querySelector('.results').innerText = dataItem.name;
        }
    });
});

const autocomplete = new AutoComplete('my-search', {
    data: ['Apple', 'Mango', 'Banana', 'Tomato', 'Orange'],
    placeholder: 'Sync search',
    matches: (data, searchTerm) => {
        return data.filter(data => data.toLowerCase().includes(searchTerm));
    },
    renderItem: (data) => {
        return `
            <div>${data}</div>
        `;
    },
    onItemClick: (dataItem, searchTerm) => {
        console.log(dataItem);
        document.querySelector('.results').innerText = dataItem;
    }
});



// autocomplete.setData();

export * from './AutoComplete';