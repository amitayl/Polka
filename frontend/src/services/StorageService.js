function load(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

function store(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export default {
    session: {
        load,
        store
    }
}