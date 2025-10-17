import express from "express";
import * as Users from "./data/user.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.get("/", (req, res) => {
    const users = Users.getUsers()
    res.json(users)
})

router.post("/register", (req,res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400).json({ message: "Usre notfound" })
    }
    let user = Users.getUserById(email)
    if (user) {
         res.status(400).json({ message: "Usre notfound" })
    }
    const salt = bcrypt.getSaltSync(12)
    const hashPassword = bcrypt.hashSync(password, salt)
    const saved = Users.saveUser(name, email, hashPassword)
    user = Users.getUserById(saved.lastInsertRowid)
    delete user.password
    res.status(201).json(user)
})


router.post("/login", (req,res) => {
    const {name,  password} = req.body
    if (!name || !password) {
        res.status(400).json({ message: "Missing" })
    }
    let user = Users.getUserById(email)
    if (!user) {
         res.status(400).json({ message: "Invalid" })
    }
    if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({ message: "Invalid" })
    }
    const token = jwt.sign({id: user.id, email: user.email}, "secret_key", {expiresIn: "30s"}, )
    res.status(201).json( {token})
})

router.patch("/:id", (req, res) =>{
    const id = req.userId
    const {name, email, password} = req.body
    let hashPassword
    if (password) {
        const salt = bcrypt.getSaltSync(12)
        hashPassword = bcrypt.hashSync(password, salt)
    }
    let user = Users.getUserById(id)
    Users.updateUser(id, name || user.name, email || user.email, hashPassword || user.password)
    user = Users.getUserById(id)
    delete user.password
    res.status(201).json(user)
})

router.get("/me", (req, res) =>{
    const user = Users.getUserById(+req.params)
    delete user.password
    res.json(user)
})

function auth(req, res, next) {
    const accessToken = req.headers.authorization
    if (!accessToken){
        return res.status(400).json({ message: "Invalid" })
    }
    const token = accessToken.split(' ')[1]
    const data = jwt.verify(token, "secret_key")
    const now = Math.floor(Date.now() / 100)
    if (data?.exp < now) {
        return res.status(403).json({ message: "Invalid" })
    }
    req.userId = data.id
    req.useremail = data.email
    next()
    console.log(accessToken)

}


export default router