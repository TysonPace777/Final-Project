export function addSaveListeners() {
    const buttons = document.querySelectorAll('.saved-items');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product-card');

            const productToSave = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price),
                image: productElement.dataset.image
            };

            let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

            const alreadySaved = savedItems.some(item => item.id === productToSave.id);
            if (!alreadySaved) {
                savedItems.push(productToSave);
                localStorage.setItem('savedItems', JSON.stringify(savedItems));
            }
        });
    });
};
