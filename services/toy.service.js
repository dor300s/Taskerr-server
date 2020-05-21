const fs = require('fs');
const toys = require('../data/db.json');

function query({ name, inStock, type, sort }) {
    let toysToReturn = toys;
    if (inStock) toysToReturn = toysToReturn.filter(toy => toy.inStock);
    if (type) toysToReturn = toysToReturn.filter(toy => toy.type === type);
    if (name) toysToReturn = toysToReturn.filter(toy =>
        toy.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    if (sort === 'name') {
        toysToReturn.sort(function (a, b) {
            var nameA = a.name.toLocaleLowerCase();
            var nameB = b.name.toLocaleLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    } else if (sort === 'price') {
        toysToReturn.sort(function (a, b) {
            return a.price - b.price;
        });
    }

    return Promise.resolve(toysToReturn)
}

function remove(id) {
    const toyIdx = toys.findIndex(toy => toy._id === id);
    toys.splice(toyIdx, 1)
    return _saveToFile()
}

function save(toy) {

    if (!toy._id) {
        toy._id = _makeId();
        toy.createdAt = new Date(Date.now())
        toys.unshift(toy);
        return _saveToFile().then(_ => toy)
    }
    else {
        let editedToy = toys.find(currToy => currToy._id === toy._id)
        editedToy.name = toy.name;
        editedToy.price = toy.price;
        editedToy.inStock = toy.inStock;
        editedToy.type = toy.type;
        if(toy.imgUrl) editedToy.imgUrl = toy.imgUrl;
        return _saveToFile().then(_ => editedToy)
    }
}

function getToy(id) {
    console.log('toyserviceId', id);
    const currToy = toys.find(toy => toy._id === id)
    console.log(currToy);

    return Promise.resolve(currToy)
}


module.exports = {
    query,
    remove,
    save,
    getToy
}


function _saveToFile() {
    return new Promise((resolve, reject) => {
        const str = JSON.stringify(toys, null, 2);
        fs.writeFile('data/db.json', str, function (err) {
            if (err) {
                console.log('Had Problems', err)
                return reject(new Error('Cannot update bug file'));
            }
            resolve()
        });
    });
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}