import express from "express";
import * as User from "./data/user.js"

const router = express.Router()

router.get("/", (req,res) => {
    const users = User.getUsers()
    res.send("users")
})


export default router