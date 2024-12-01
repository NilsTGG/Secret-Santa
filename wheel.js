document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const result = document.getElementById('result');

    const urlParams = new URLSearchParams(window.location.search);
    const names = JSON.parse(decodeURIComponent(urlParams.get('names')));

    spinButton.addEventListener('click', () => {
        if (names.length > 0) {
            const randomIndex = Math.floor(Math.random() * names.length);
            result.textContent = `You got: ${names[randomIndex]}`;
        }
    });
});