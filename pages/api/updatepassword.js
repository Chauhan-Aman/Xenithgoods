import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import JsonWebToken from "jsonwebtoken"
import cryptoJS from "crypto-js"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = JsonWebToken.verify(token, process.env.JWT_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        var bytes = cryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        var decryptedPass = bytes.toString(cryptoJS.enc.Utf8);
        if (decryptedPass == req.body.password && req.body.npassword == req.body.cpassword) {
            let dbuser = await User.findOneAndUpdate({ email: dbuser.email }, { password: cryptoJS.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString() })
            res.status(200).json({ success: true })
            return
        }

        res.status(200).json({ success: false })
    }
    else {

        res.status(400).json({ error: "error" })
    }
}

export default connectDb(handler);