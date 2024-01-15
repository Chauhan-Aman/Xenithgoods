const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    email: { type: String, required: true },
    cart: { type: Object, default: {}, required: true }
}, { timestamps: true });


export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);