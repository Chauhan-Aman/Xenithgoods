const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForgotSchema = new Schema({
    userid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('Forgot', ForgotSchema);