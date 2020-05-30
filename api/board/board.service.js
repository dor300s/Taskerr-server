const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


const boardTemplate = {
    "title": "",
    "isStarred": false,
    "description": "",
    "members": [],
    "creator": {},
    "cratedAt": null,
    "background": {
        "color": "#f6f7fb",
        "content": "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    "msgs": [],
    "statistics": {},
    "archive": {
        "lists": [],
        "cards": []
    },
    "activities": {},
    "cardLists": []
}


async function query({ user }) {
    // console.log('querrrrrrrrryyyyyyyyy', user);

    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('board')
    try {
        const boards = await collection.find({ "members._id": user._id }).toArray();

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

async function save(board, user) {

    const collection = await dbService.getCollection('board')
    try {
        if (!board._id) {
            const { _id, imgUrl, fullName, userName } = user;
            const miniUser = { _id, imgUrl, fullName, userName }
            board.creator = miniUser;
            board.members = [miniUser];
            board = { ...boardTemplate, ...board, cratedAt: Date.now() }
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


