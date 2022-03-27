const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment-timezone');

const BoardSchema = new Schema({
    writer: {
        type: String,
        required: [true, '작성자를 입력해주세요.']
    },
    title: {
        type: String,
        required: [true, '제목을 입력해주세요.']
    },
    content: {
        type: String,
        required: [true, "내용을 입력해주세요."]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'Board' });

BoardSchema.methods.dateFormat = function(){

    return moment(this.createdAt)
        .tz("Asia/Seoul")
        .format('MMMM Do YYYY, h:mm:ss a')
        
}

module.exports = mongoose.model('Board', BoardSchema);

