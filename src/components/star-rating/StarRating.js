export class StarRating {
    constructor(selector, { numberOfStars, onChange }) {
        this.onChange = onChange;
        this.container = document.getElementById(selector);
        this.template = document.getElementById('star-template');
        this.rating = 0;
        const frag = document.createDocumentFragment();
        if (numberOfStars > 0) {
            for (let i=0; i<numberOfStars; i++) {
                const star = this.template.content.cloneNode(true);
                star.firstElementChild.dataset.count = i + 1;
                star.firstElementChild.addEventListener('mouseover', this.highlightStars.bind(this));
                frag.appendChild(star);
            }
        }
        this.container.appendChild(frag);
        this.container.addEventListener('mouseleave', this.resetStars.bind(this));
        this.container.addEventListener('click', this.setRating.bind(this));
    }

    setRating(e) {
        if (e.target !== e.currentTarget) {
            const starCount = parseInt(e.target.dataset.count);
            this.rating = starCount;
            this.onChange(this.rating);
        }
    }

    highlightStars(e) {
        const starCount = parseInt(e.target.dataset.count);
        const stars = this.container.querySelectorAll('.star');
        stars.forEach((star, i) => {
            if (i+1 <= starCount) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    resetStars() {
        const stars = this.container.querySelectorAll('.star');
        stars.forEach((star, i) => {
            if (i+1 <= this.rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    get ratingValue() {
        return this.rating;
    }
}