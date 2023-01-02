
export class FileExplorer {
    constructor(id, data) {
        this.root = document.getElementById(id);
        this.createFolderTree(this.root, data.files);
        this.root.addEventListener('click', (e) => {
            const target = e.target;
            if (target.parentElement.tagName === 'UL' && target.tagName ===  'LI' && !target.matches('.explorer__item--file')) {
                if (target.parentElement.style.height) {
                    target.parentElement.style.removeProperty('height')
                } else {
                    target.parentElement.style.height =  target.clientHeight + 'px';
                }
            }
        });
    }

    createFolderTree(root, data) {
        const fileTemplate = document.getElementById('file-template');
        const folderTemplate = document.getElementById('folder-template');

        data.forEach(item => {
            if (!item.isFolder) {
                const fileElement = fileTemplate.content.cloneNode(true).firstElementChild;
                fileElement.innerText = item.name;
                root.appendChild(fileElement);
            } else {
                const folderElement = folderTemplate.content.cloneNode(true).firstElementChild;
                folderElement.querySelector('.explorer__item--folder').innerText = item.name;
                root.appendChild(folderElement);
                this.createFolderTree(folderElement, item.items);
            }
        });

    }
}