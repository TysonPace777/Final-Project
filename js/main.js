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