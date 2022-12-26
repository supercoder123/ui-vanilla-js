import { StarRating } from './StarRating';
import '../../style.css';
import './style.css';


const rating = new StarRating('app', {
    numberOfStars: 15,
    onChange: (rating) => {
        console.log(rating);
        document.getElementById('rating').innerText = `You have received ${rating} stars`;
    }
});





export * from './StarRating';