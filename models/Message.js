const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema(
    {
        message: {
            type: String
        },
        sender: {
            type: String
        },
        room_id: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: 'message'
    }
);

module.exports = mongoose.model('Message', Message)