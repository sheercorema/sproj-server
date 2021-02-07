const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./User')

var controller = {}

controller.register = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) return res.json({error: 'email and password are required'})

    try {
        data = await User.findOne({ email }).exec()
    } catch (error) {
        console.log(error)
        return res.json({error: 'an error occured'})
    }
    if (data) return res.json({error: 'email already in use'})

    const user = new User({
        email,
        password
    })

    user.password = await bcrypt.hash(user.password, 12);

    try {
        user.save()
    } catch (error) {
        console.log(error)
        return res.json({error: 'an error occured'})
    }
    return res.json({data: 'account created successfully'})
}

controller.login = async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) return res.json({error: 'email and password are required'})

    try {
        data = await User.findOne({ email }).exec()
    } catch (error) {
        console.log(error)
        return res.json({error: 'an error occured'})
    }
    if (!data) return res.json({error: 'incorrect credentials'})

    const match = await bcrypt.compare(password, data.password);

    if (!match) {
       return res.json({error: 'incorrect credentials'})
    } else {
        var token = jwt.sign(data.toJSON(), 'CHANGEME')
        return res.json({data: token})
    }

}

module.exports = controller