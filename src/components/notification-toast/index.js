import { Notification } from './Notification';
import '../../styles.css';
import './styles.css';

const toast = new Notification({});


document.getElementById('success-trigger').addEventListener('click', function() {
    const duration = +document.querySelector('input[type="number').value;
    toast.success(`Success: Duration: ${duration}`, { duration });
});

document.getElementById('error-trigger').addEventListener('click', function() {
    const duration = +document.querySelector('input[type="number').value;
    toast.error(`Error: Duration: ${duration}`, { duration });
});

document.getElementById('info-trigger').addEventListener('click', function() {
    const duration = +document.querySelector('input[type="number').value;
    toast.info(`Info: Duration: ${duration}`, { duration });
});
