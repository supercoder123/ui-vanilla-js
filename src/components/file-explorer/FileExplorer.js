
export class FileExplorer {
    constructor(id, data) {
        this.root = document.getElementById(id);
        this.createFolderTree(this.root, data);
        this.root.addEventListener('click', (e) => {
            const target = e.target;
            if (target.parentElement.tagName === 'UL' && target.tagName ===  'LI' && !target.matches('.explorer__item--file')) {
                target.querySelector('.explorer__item--folder').classList.toggle('folder-close');
                if (target.parentElement.style.height) {
                    target.parentElement.style.removeProperty('height')
                } else {
                    target.parentElement.style.height =  target.clientHeight + 'px';
                }
            }

            if (target.matches('button.explorer__item-add-file')) {
                const fileTemplate = document.getElementById('add-file-template');
                const fileElement = fileTemplate.content.cloneNode(true).firstElementChild;
                const newId = Math.floor(Math.random() * 100);
                fileElement.dataset.fileId = newId;
                const listItem = target.parentElement.parentElement;
                const input = fileElement.querySelector('input');
                const fileId = listItem.dataset.fileId;
                input.addEventListener('keydown', function handler(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        input.removeEventListener('keydown', handler);
                        fileElement.innerHTML = e.target.value;
                        this.addFile(+fileId, data, e.target.value, newId);
                    }
                }.bind(this));
                listItem.parentElement.insertBefore(fileElement, listItem.nextElementSibling);
                input.focus({ preventScroll: true });
                input.addEventListener('blur', function handler(e) {
                    if (!e.target.value.length) {
                        input.removeEventListener('blur', handler);
                        fileElement.remove();
                    }
                });
            }

            if (target.matches('button.explorer__item-add-folder')) {
                const folderTemplate = document.getElementById('add-folder-template');
                const folderElement = folderTemplate.content.cloneNode(true).firstElementChild;
                const newId = Math.floor(Math.random() * 100);
                folderElement.firstElementChild.dataset.fileId = newId;
                const listItem = target.parentElement.parentElement;
                const fileId = listItem.dataset.fileId;
                const input = folderElement.querySelector('input');
                input.addEventListener('keydown', function handler(e) {
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        input.removeEventListener('keydown', handler);
                        folderElement.querySelector('.explorer__item--folder').innerHTML = e.target.value;
                        this.addFolder(+fileId, data, e.target.value, newId);
                    }
                }.bind(this));
                listItem.parentElement.insertBefore(folderElement, listItem.nextElementSibling);
                input.focus({ preventScroll: true });
                input.addEventListener('blur', function handler(e) {
                    if (!e.target.value.length) {
                        input.removeEventListener('blur', handler);
                        folderElement.remove();
                    }
                });
            }
        });
    }

    createFolderTree(root, data) {
        const fileTemplate = document.getElementById('file-template');
        const folderTemplate = document.getElementById('folder-template');

        data.forEach(item => {
            if (!item.isFolder) {
                const fileElement = fileTemplate.content.cloneNode(true).firstElementChild;
                fileElement.dataset.fileId = item.id;
                fileElement.innerText = item.name;
                root.appendChild(fileElement);
            } else {
                const folderElement = folderTemplate.content.cloneNode(true).firstElementChild;
                folderElement.firstElementChild.dataset.fileId = item.id;
                folderElement.querySelector('.explorer__item--folder').innerText = item.name;
                root.appendChild(folderElement);
                this.createFolderTree(folderElement, item.items);
            }
        });

    }

    getFile(id, files) {
        for (let i=0; i<files.length; i++) {
            if (files[i].id === id) {
                return files[i];
            }

            if (files[i].isFolder) {
                const result = this.getFile(id, files[i].items);;
                if (result) {
                    return result;
                }
            }
        }
    }

    addFile(id, files, fileName, newId) {
        const file = this.getFile(id, files);
        file.items.push({
            id: newId,
            name: fileName,
            isFolder: false,
            items: []
        });
        localStorage.setItem('files', JSON.stringify(files));
    }

    addFolder(id, files, folderName, newId) {
        const file = this.getFile(id, files);
        file.items.push({
            id: newId,
            name: folderName,
            isFolder: true,
            items: []
        });
        localStorage.setItem('files', JSON.stringify(files));
    }
}