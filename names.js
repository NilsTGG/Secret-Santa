
export function getNames() {
    return JSON.parse(localStorage.getItem('names')) || [];
}

export function saveNames(names) {
    localStorage.setItem('names', JSON.stringify(names));
}

export function getLog() {
    return JSON.parse(localStorage.getItem('log')) || [];
}

export function saveLog(log) {
    localStorage.setItem('log', JSON.stringify(log));
}