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
    const token = jwt.sign({id: user.id, email: user.email}, "secret_key", {expiresIn: "30m"}, )
    res.status(201).json(token)
})


export default router