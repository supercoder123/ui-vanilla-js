import { Notification } from './Notification';
import '../../styles.css';
import './styles.css';

const toast = new Notification({
    position: 'bottom-right'
});

document.getElementById('success-trigger').addEventListener('click', function() {
    toast.success('Success: Duration: 3000, Inserted at end', { insertAtEnd: true });
});

document.getElementById('error-trigger').addEventListener('click', function() {
    toast.error('Error: Duration: 2000, Inserted at start ', { duration: 2000, insertAtEnd: false });
});

document.getElementById('info-trigger').addEventListener('click', function() {
    toast.info('Info: Duration: 1000, Inserted at end', { duration: 1000, insertAtEnd: true });
});
