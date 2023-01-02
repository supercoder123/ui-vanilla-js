import { StarRating } from './StarRating';
import '../../styles.css';
import './styles.css';

const rating = new StarRating('app', {
    numberOfStars: 5,
    onChange: (rating) => {
        document.getElementById('rating').innerText = `You have received ${rating} stars`;
    }
});

export * from './StarRating';