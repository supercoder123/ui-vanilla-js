import { FileExplorer } from './FileExplorer';
import '../../styles.css';
import './styles.css';
import { data } from './data';


const explorer = new FileExplorer('file-explorer', JSON.parse(localStorage.getItem('files')) || data.files);
