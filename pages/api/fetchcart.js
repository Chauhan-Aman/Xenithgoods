import Cart from "../../models/UserCarts"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        let mycart = await Cart.findOne({ email });

        if (!mycart) {
            mycart = await Cart.create({ email, cart: {} });
        }

        const { cart } = mycart;
        res.status(200).json({ cart });
    } else {
        res.status(400).json({ error: "Error Fetching the Cart" });
    }
}

export default connectDb(handler);
