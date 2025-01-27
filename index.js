import Store from './store.js';

document.addEventListener("DOMContentLoaded", (event) => {
    let myStore = new Store();
    myStore.showTable();
});