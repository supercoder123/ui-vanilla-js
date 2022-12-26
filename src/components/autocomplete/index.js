import { AutoComplete } from './AutoComplete';
import '../../style.css';

const autocomplete = new AutoComplete('my-search', {
    highlight: false,
    data: ['a', 'b', ],
    placeholder: '',
    minChar: 3,
    debounce: 0,
    loader: '',
    renderItem: () => {
        return ''
    },
    onItemClick: () => {

    }
});

// autocomplete.setData();

export * from './AutoComplete';