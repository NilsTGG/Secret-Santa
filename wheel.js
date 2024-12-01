import { getNames, saveNames, getLog, saveLog } from './names.js';

document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const result = document.getElementById('result');
    const userNameInput = document.getElementById('userNameInput');

    let names = getNames();
    let log = getLog();

    spinButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName && names.length > 0) {
            const filteredNames = names.filter(name => name !== userName);
            if (filteredNames.length > 0) {
                const randomIndex = Math.floor(Math.random() * filteredNames.length);
                const selectedName = filteredNames[randomIndex];
                result.textContent = `You got: ${selectedName}`;
                names = names.filter(name => name !== selectedName);
                saveNames(names);
                log.push(`${userName} spinned ${selectedName}`);
                saveLog(log);
                spinButton.disabled = true;
                userNameInput.disabled = true;
            } else {
                result.textContent = 'No more names available.';
            }
        }
    });
});