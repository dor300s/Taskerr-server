const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    try {
        const toys = await collection.find().toArray();

        /*   toys = toys.map(toy => {
              toy.byUser = {_id: toy.byUser._id, username: toy.byUser.username}
              toy.aboutUser = {_id: toy.aboutUser._id, username: toy.aboutUser.username}
              delete toy.byUserId;
              delete toy.aboutUserId;
              return toy;
          }) */

        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function get(toyId) {

    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot find toy ${toyId}`)
        throw err;
    }
}

async function remove(toyId) {
    console.log('toy id to delete', toyId);

    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${toyId}`)
        throw err;
    }
}

async function save(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        if (!toy._id) {
            toy.createdAt = new Date(Date.now())
            await collection.insertOne(toy)
        } else {
            toy._id = ObjectId(toy._id);
            await collection.replaceOne({ "_id": toy._id }, { $set: toy })
        }

        return toy;
    } catch (err) {
        console.log(`ERROR: cannot save toy`)
        throw err;
    }
}



function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    get,
    remove,
    save
}


