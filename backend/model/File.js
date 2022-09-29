import mongoose from 'mongoose'
const { Schema } = mongoose

const FileSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    urlOfFile: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const file = mongoose.model('File', FileSchema);
export default file;