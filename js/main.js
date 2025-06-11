const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const body = document.body;

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');

    if (!hamButton.classList.toggle('open')) {
        body.style.display = 'grid';
    }
});

function renderSkeletons(count = 6) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    container.classList.add('skeleton-container');

    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-card';
        container.appendChild(skeleton);
    }
}