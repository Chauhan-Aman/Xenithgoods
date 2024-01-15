import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import JsonWebToken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == 'POST') {

        let token = req.body.token
        let user = JsonWebToken.verify(token, process.env.JWT_SECRET)
        let Admin = await User.findOne({ email: user.email })

        const { isAdmin } = Admin
        if (isAdmin == process.env.ADMIN_KEY) {
            res.status(200).json({ success: true })
        }
        else {
            res.status(200).json({ success: false })
        }
    }
    else {
        res.status(400).json({ error: "Access Denied" })
    }
}

export default connectDb(handler);