const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board')
    try {
        const boards = await collection.find().toArray();

        /*   boards = boards.map(board => {
              board.byUser = {_id: board.byUser._id, username: board.byUser.username}
              board.aboutUser = {_id: board.aboutUser._id, username: board.aboutUser.username}
              delete board.byUserId;
              delete board.aboutUserId;
              return board;
          }) */

        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function get(boardId) {

    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board;
    } catch (err) {
        console.log(`ERROR: cannot find board ${boardId}`)
        throw err;
    }
}

async function remove(boardId) {
    console.log('board id to delete', boardId);

    const collection = await dbService.getCollection('board')
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${boardId}`)
        throw err;
    }
}

async function save(board) {
    console.log(board);
    
    const collection = await dbService.getCollection('board')
    try {
        if (!board._id) {
            board.createdAt = new Date(Date.now())
            await collection.insertOne(board)
        } else {
            board._id = ObjectId(board._id);
            await collection.replaceOne({ "_id": board._id }, { $set: board })
        }

        return board;
    } catch (err) {
        console.log(`ERROR: cannot save board`)
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


