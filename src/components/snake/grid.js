export function createGrid(
    rows,
    cols
  ) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '';
      const fragment = document.createDocumentFragment();
  
      app.style.gridTemplateRows = `repeat(${rows}, 20px)`;
      app.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
  
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const div = document.createElement('div');
          div.className = 'tile';
          // div.innerText = `${i},${j}`;
          fragment.appendChild(div);
        }
      }
      app.appendChild(fragment);
      app.focus();
    }
  
    return [
      Array(rows)
        .fill(0)
        .map(() => Array(cols).fill(0)),
      app.children,
    ];
  }
  