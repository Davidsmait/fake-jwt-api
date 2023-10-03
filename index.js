const express = require("express")
const jwt = require("jsonwebtoken")
const {verify} = require("jsonwebtoken");

const secret = process.env.SECRET
const app = express()

// generate rando secret key:
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

app.post('/login', (req,res) => {
    //Get user from db
    const {id: sub, name} = {id: 'wordpass', name: 'Deed'}
    const token = jwt.sign({
        sub,
        name,
        exp: Date.now() * 60 * 1000
    }, secret)

    res.send({token})
})

app.get('/public', (req, res) => {
    res.send("respuesta publica")
    console.log("public response")
})

app.get('/verify_token', (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token,secret)

        if (Date.now() > payload.exp) {
            res.status(401).send({error: "token expired"})
        }
        res.send("token valid")
    }catch (e) {
        res.status(401).send({error: e.message})
    }
})

app.listen(3000)
