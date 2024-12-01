document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameInput');
    const nameList = document.getElementById('nameList');
    const generateLinkButton = document.getElementById('generateLink');
    const shareableLinkContainer = document.getElementById('shareableLinkContainer');

    let names = [];

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name) {
            names.push(name);
            updateNameList();
            nameInput.value = '';
        }
    });

    generateLinkButton.addEventListener('click', () => {
        if (names.length > 0) {
            const encodedNames = encodeURIComponent(JSON.stringify(names));
            const shareableLink = `${window.location.origin}${window.location.pathname.replace('index.html', '')}wheel.html?names=${encodedNames}`;
            shareableLinkContainer.innerHTML = `<a href="${shareableLink}" target="_blank">${shareableLink}</a>`;
        }
    });

    function updateNameList() {
        nameList.innerHTML = '';
        names.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            nameList.appendChild(li);
        });
    }
});
