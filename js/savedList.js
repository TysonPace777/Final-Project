document.addEventListener('DOMContentLoaded', () => {
    const savedList = document.getElementById('saved');
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    if (savedItems.length === 0) {
        savedList.innerHTML = '<li class="center-text">No saved items found.</li>';
        return;
    }

    savedItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('saved-item');

        li.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100px"/>
            <p class=""saved-name>${item.name}</p>
            <p class="saved-price">$${item.price}</p>
        `;
        savedList.appendChild(li);
    });
    const clear = document.getElementById('clear-items')
    clear.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
});
