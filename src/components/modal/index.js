import { Modal } from './Modal';
import '../../styles.css';
import './styles.css';


const modal = new Modal('modal-1');

document.getElementById('modal-open').addEventListener('click', function() {
    modal.open();
});