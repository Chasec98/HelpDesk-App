/* eslint-disable no-console */
async function getDB() {
    return new Promise((resolve) => {

        let trans = this.db.transaction(['customers'], 'readonly');
        trans.oncomplete = () => {
            resolve(customers);
        };

        let store = trans.objectStore('customers');
        let customers = [];

        store.openCursor().onsuccess = e => {
            let cursor = e.target.result;
            if (cursor) {
                customers.push(cursor.value)
                cursor.continue();
            }
        };

    });
}

async function addData(data) {
    return new Promise((resolve) => {
        let trans = this.db.transaction(['customers'], 'readwrite');
        trans.oncomplete = () => {
            resolve();
        };

        let store = trans.objectStore('customers');
        store.add(data[0]);
    });
}

module.exports = {
    getDB,
    addData
}