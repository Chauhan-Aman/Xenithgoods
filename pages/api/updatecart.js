import Cart from "../../models/UserCarts"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { email } = req.body;
        await Cart.findOneAndUpdate({ email: email }, { cart: req.body.cart })

        res.status(200).json({ success: "success" })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler);