import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
    roomid: String
});

export default mongoose.model('messageContent', whatsappSchema);
