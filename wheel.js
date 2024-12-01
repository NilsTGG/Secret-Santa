document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const result = document.getElementById('result');
    const userNameInput = document.getElementById('userNameInput');

    let names = JSON.parse(localStorage.getItem('names')) || [];
    let log = JSON.parse(localStorage.getItem('log')) || [];

    spinButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName && names.length > 0) {
            const filteredNames = names.filter(name => name !== userName);
            if (filteredNames.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredNames.length);
                const selectedName = filteredNames[randomIndex];
                result.textContent = `You got: ${selectedName}`;
                names = names.filter(name => name !== selectedName);
                localStorage.setItem('names', JSON.stringify(names));
                log.push(`${userName} spinned ${selectedName}`);
                localStorage.setItem('log', JSON.stringify(log));
                spinButton.disabled = true;
                userNameInput.disabled = true;
            } else {
                result.textContent = 'No more names available.';
            }
        }
    });
});